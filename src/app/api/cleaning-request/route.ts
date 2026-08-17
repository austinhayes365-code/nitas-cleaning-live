import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

type CleaningRequest = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  customerType: "residential" | "commercial";
  serviceType: string;
  propertySize: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  addons: string[];
  notes?: string;
};

function formatLabel(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createApprovalToken(
  requestData: CleaningRequest,
  secret: string
) {
  const payload = {
    ...requestData,

    /*
     * Link expires after 7 days.
     */
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };

  const encodedPayload = Buffer.from(
    JSON.stringify(payload)
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CleaningRequest>;

    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "email",
      "customerType",
      "serviceType",
      "propertySize",
      "address",
      "preferredDate",
      "preferredTime",
    ] as const;

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            message: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    if (
      body.customerType !== "residential" &&
      body.customerType !== "commercial"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid cleaning type.",
        },
        { status: 400 }
      );
    }

    const cleaningRequest: CleaningRequest = {
      firstName: body.firstName!,
      lastName: body.lastName!,
      phone: body.phone!,
      email: body.email!,
      customerType: body.customerType,
      serviceType: body.serviceType!,
      propertySize: body.propertySize!,
      address: body.address!,
      preferredDate: body.preferredDate!,
      preferredTime: body.preferredTime!,
      addons: Array.isArray(body.addons) ? body.addons : [],
      notes: body.notes?.trim() || "",
    };

    console.log("NEW NITA'S CLEANING REQUEST:");
    console.log(cleaningRequest);

    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NITA_NOTIFICATION_EMAIL;
    const approvalSecret = process.env.APPROVAL_SECRET;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    console.log("EMAIL / APPROVAL ENV CHECK:", {
      RESEND_API_KEY: !resendApiKey,
      NITA_NOTIFICATION_EMAIL: !notificationEmail,
      APPROVAL_SECRET: !approvalSecret,
      NEXT_PUBLIC_SITE_URL: !siteUrl,
    });

    if (
      !resendApiKey ||
      !notificationEmail ||
      !approvalSecret ||
      !siteUrl
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email notification service is not configured.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const addonText =
      cleaningRequest.addons.length > 0
        ? cleaningRequest.addons.join(", ")
        : "None";

    const notesText =
      cleaningRequest.notes &&
      cleaningRequest.notes.length > 0
        ? cleaningRequest.notes
        : "None";

    const customerName =
      `${cleaningRequest.firstName} ${cleaningRequest.lastName}`;

    /*
     * Secure signed approval token.
     * Customer data is included inside the token and protected
     * from modification with the HMAC signature.
     */
    const approvalToken = createApprovalToken(
      cleaningRequest,
      approvalSecret
    );

    /*
     * IMPORTANT:
     * This link does NOT approve immediately.
     * It opens a confirmation page first.
     */
    const approvalUrl =
      `${siteUrl}/approve-appointment?token=` +
      encodeURIComponent(approvalToken);

    const { data, error } = await resend.emails.send({
      from:
        "Nita's Cleaning Services <onboarding@resend.dev>",

      to: [notificationEmail],

      replyTo: cleaningRequest.email,

      subject: `New Cleaning Request - ${customerName}`,

      html: `
        <div
          style="
            margin:0;
            padding:0;
            background:#f4f4f4;
            font-family:Arial,Helvetica,sans-serif;
            color:#111111;
          "
        >
          <div
            style="
              max-width:700px;
              margin:0 auto;
              background:#ffffff;
            "
          >

            <div
              style="
                background:#050505;
                padding:32px 36px;
                border-bottom:5px solid #ef0011;
              "
            >
              <div
                style="
                  color:#ef0011;
                  font-size:12px;
                  font-weight:700;
                  letter-spacing:4px;
                  text-transform:uppercase;
                  margin-bottom:12px;
                "
              >
                New Service Request
              </div>

              <div
                style="
                  color:#ffffff;
                  font-size:32px;
                  font-weight:800;
                  line-height:1.1;
                "
              >
                NITA'S CLEANING SERVICES
              </div>
            </div>

            <div style="padding:36px;">

              <p
                style="
                  margin:0 0 28px;
                  font-size:16px;
                  color:#555555;
                  line-height:1.6;
                "
              >
                A new cleaning request was submitted through
                the website. The appointment is pending review
                and has not yet been confirmed.
              </p>

              <div
                style="
                  margin-bottom:28px;
                  border-left:4px solid #ef0011;
                  padding:14px 18px;
                  background:#f7f7f7;
                "
              >
                <div
                  style="
                    font-size:12px;
                    color:#ef0011;
                    font-weight:700;
                    letter-spacing:2px;
                    text-transform:uppercase;
                    margin-bottom:6px;
                  "
                >
                  Customer
                </div>

                <div
                  style="
                    font-size:24px;
                    font-weight:800;
                    color:#111111;
                  "
                >
                  ${escapeHtml(customerName)}
                </div>
              </div>

              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  border-collapse:collapse;
                  margin-bottom:30px;
                "
              >
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-weight:700;width:180px;">
                    Cleaning Type
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;">
                    ${escapeHtml(
                      formatLabel(
                        cleaningRequest.customerType
                      )
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-weight:700;">
                    Service
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;">
                    ${escapeHtml(
                      formatLabel(
                        cleaningRequest.serviceType
                      )
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-weight:700;">
                    Property Size
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;">
                    ${escapeHtml(
                      formatLabel(
                        cleaningRequest.propertySize
                      )
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-weight:700;">
                    Service Address
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;">
                    ${escapeHtml(
                      cleaningRequest.address
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-weight:700;">
                    Preferred Date
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;">
                    ${escapeHtml(
                      cleaningRequest.preferredDate
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-weight:700;">
                    Preferred Time
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;">
                    ${escapeHtml(
                      formatLabel(
                        cleaningRequest.preferredTime
                      )
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-weight:700;">
                    Phone
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;">
                    ${escapeHtml(
                      cleaningRequest.phone
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-weight:700;">
                    Email
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;">
                    ${escapeHtml(
                      cleaningRequest.email
                    )}
                  </td>
                </tr>
              </table>

              <div style="margin-bottom:28px;">
                <div
                  style="
                    font-size:12px;
                    color:#ef0011;
                    font-weight:700;
                    letter-spacing:2px;
                    text-transform:uppercase;
                    margin-bottom:10px;
                  "
                >
                  Add-On Services
                </div>

                <div
                  style="
                    background:#f7f7f7;
                    padding:16px 18px;
                    line-height:1.6;
                  "
                >
                  ${escapeHtml(addonText)}
                </div>
              </div>

              <div style="margin-bottom:30px;">
                <div
                  style="
                    font-size:12px;
                    color:#ef0011;
                    font-weight:700;
                    letter-spacing:2px;
                    text-transform:uppercase;
                    margin-bottom:10px;
                  "
                >
                  Notes / Special Instructions
                </div>

                <div
                  style="
                    background:#f7f7f7;
                    padding:16px 18px;
                    line-height:1.6;
                    white-space:pre-wrap;
                  "
                >
                  ${escapeHtml(notesText)}
                </div>
              </div>

              <div
                style="
                  background:#ef0011;
                  color:#ffffff;
                  padding:18px 20px;
                  font-size:14px;
                  font-weight:700;
                  text-align:center;
                  margin-bottom:28px;
                "
              >
                APPOINTMENT PENDING REVIEW
              </div>

              <div
                style="
                  border-top:1px solid #dddddd;
                  padding-top:28px;
                  text-align:center;
                "
              >
                <div
                  style="
                    font-size:12px;
                    color:#ef0011;
                    font-weight:700;
                    letter-spacing:2px;
                    text-transform:uppercase;
                    margin-bottom:10px;
                  "
                >
                  Ready to confirm?
                </div>

                <p
                  style="
                    font-size:14px;
                    color:#555555;
                    line-height:1.6;
                    margin:0 0 20px;
                  "
                >
                  Review the request above. If the requested
                  appointment works, continue to the approval
                  screen below.
                </p>

                <a
                  href="${approvalUrl}"
                  style="
                    display:inline-block;
                    background:#050505;
                    color:#ffffff;
                    text-decoration:none;
                    font-size:14px;
                    font-weight:800;
                    letter-spacing:1px;
                    padding:18px 34px;
                    border:2px solid #050505;
                  "
                >
                  APPROVE APPOINTMENT →
                </a>

                <p
                  style="
                    font-size:11px;
                    color:#999999;
                    line-height:1.5;
                    margin:16px 0 0;
                  "
                >
                  Clicking this button opens a confirmation page.
                  The appointment is not approved until the final
                  confirmation button is pressed.
                </p>
              </div>
            </div>

            <div
              style="
                background:#050505;
                color:#888888;
                padding:22px 36px;
                font-size:12px;
                line-height:1.6;
              "
            >
              This notification was generated automatically from
              Nita's Cleaning Services website.
            </div>
          </div>
        </div>
      `,

      text: `
NEW CLEANING REQUEST
NITA'S CLEANING SERVICES

Customer: ${customerName}

Cleaning Type:
${formatLabel(cleaningRequest.customerType)}

Service:
${formatLabel(cleaningRequest.serviceType)}

Property Size:
${formatLabel(cleaningRequest.propertySize)}

Service Address:
${cleaningRequest.address}

Preferred Date:
${cleaningRequest.preferredDate}

Preferred Time:
${formatLabel(cleaningRequest.preferredTime)}

Phone:
${cleaningRequest.phone}

Email:
${cleaningRequest.email}

Add-On Services:
${addonText}

Notes / Special Instructions:
${notesText}

APPOINTMENT PENDING REVIEW

Approve Appointment:
${approvalUrl}

The approval link opens a confirmation page.
The appointment is not approved until final confirmation.
      `.trim(),
    });

    if (error) {
      console.error("RESEND EMAIL ERROR:");
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message:
            "Cleaning request received, but email notification failed.",
        },
        { status: 500 }
      );
    }

    console.log("RESEND EMAIL SENT:");
    console.log("ID:", data?.id);

    return NextResponse.json(
      {
        success: true,
        message:
          "Cleaning request received and email notification sent.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Cleaning request error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process cleaning request.",
      },
      { status: 500 }
    );
  }
}