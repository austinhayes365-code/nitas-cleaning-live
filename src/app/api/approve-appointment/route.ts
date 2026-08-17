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
  expiresAt: number;
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

function verifyApprovalToken(
  token: string,
  secret: string
): CleaningRequest | null {
  try {
    const parts = token.split(".");

    if (parts.length !== 2) {
      return null;
    }

    const [encodedPayload, suppliedSignature] = parts;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(encodedPayload)
      .digest("base64url");

    const suppliedBuffer = Buffer.from(suppliedSignature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (suppliedBuffer.length !== expectedBuffer.length) {
      return null;
    }

    const signaturesMatch = crypto.timingSafeEqual(
      suppliedBuffer,
      expectedBuffer
    );

    if (!signaturesMatch) {
      return null;
    }

    const decodedPayload = Buffer.from(
      encodedPayload,
      "base64url"
    ).toString("utf8");

    const requestData = JSON.parse(
      decodedPayload
    ) as CleaningRequest;

    if (!requestData.expiresAt) {
      return null;
    }

    if (Date.now() > requestData.expiresAt) {
      return null;
    }

    return requestData;
  } catch (error) {
    console.error(
      "Approval token verification failed:",
      error
    );

    return null;
  }
}

function redirectToError(
  request: Request,
  message: string
) {
  const url = new URL(
    "/approve-appointment",
    request.url
  );

  url.searchParams.set("status", "error");
  url.searchParams.set("message", message);

  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  try {
    /*
     * We now receive a NORMAL HTML form submission
     * instead of JavaScript JSON.
     */
    const formData = await request.formData();

    const tokenValue = formData.get("token");

    const token =
      typeof tokenValue === "string"
        ? tokenValue
        : "";

    if (!token) {
      return redirectToError(
        request,
        "Approval token is missing."
      );
    }

    const approvalSecret =
      process.env.APPROVAL_SECRET;

    const resendApiKey =
      process.env.RESEND_API_KEY;

    if (!approvalSecret || !resendApiKey) {
      console.error(
        "APPROVAL ENVIRONMENT VARIABLES MISSING"
      );

      return redirectToError(
        request,
        "Appointment approval service is not configured."
      );
    }

    const cleaningRequest =
      verifyApprovalToken(
        token,
        approvalSecret
      );

    if (!cleaningRequest) {
      return redirectToError(
        request,
        "This approval link is invalid or has expired."
      );
    }

    const resend = new Resend(
      resendApiKey
    );

    const customerName =
      `${cleaningRequest.firstName} ${cleaningRequest.lastName}`;

    const addonText =
      cleaningRequest.addons.length > 0
        ? cleaningRequest.addons.join(", ")
        : "None";

    const { data, error } =
      await resend.emails.send({
        from:
          "Nita's Cleaning Services <onboarding@resend.dev>",

        to: [cleaningRequest.email],

        subject:
          "Your Cleaning Appointment Has Been Confirmed",

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

              <!-- HEADER -->
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
                  Appointment Confirmed
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


              <!-- BODY -->
              <div style="padding:36px;">

                <p
                  style="
                    margin:0 0 10px;
                    color:#ef0011;
                    font-size:12px;
                    font-weight:700;
                    letter-spacing:2px;
                    text-transform:uppercase;
                  "
                >
                  You're Confirmed
                </p>

                <h1
                  style="
                    margin:0 0 20px;
                    font-size:30px;
                    line-height:1.2;
                    color:#111111;
                  "
                >
                  Thank you, ${escapeHtml(
                    customerName
                  )}.
                </h1>

                <p
                  style="
                    margin:0 0 30px;
                    font-size:16px;
                    color:#555555;
                    line-height:1.7;
                  "
                >
                  Your cleaning request has been reviewed
                  and approved by Nita's Cleaning Services.
                  Your confirmed appointment details are
                  listed below.
                </p>


                <!-- CONFIRMED APPOINTMENT -->
                <div
                  style="
                    background:#f7f7f7;
                    border-left:4px solid #ef0011;
                    padding:22px;
                    margin-bottom:30px;
                  "
                >

                  <div
                    style="
                      font-size:12px;
                      font-weight:700;
                      color:#ef0011;
                      letter-spacing:2px;
                      text-transform:uppercase;
                      margin-bottom:8px;
                    "
                  >
                    Confirmed Appointment
                  </div>

                  <div
                    style="
                      font-size:24px;
                      font-weight:800;
                      color:#111111;
                    "
                  >
                    ${escapeHtml(
                      cleaningRequest.preferredDate
                    )}
                    —
                    ${escapeHtml(
                      formatLabel(
                        cleaningRequest.preferredTime
                      )
                    )}
                  </div>

                </div>


                <!-- APPOINTMENT DETAILS -->
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
                    <td
                      style="
                        padding:13px 0;
                        border-bottom:1px solid #e5e5e5;
                        font-weight:700;
                        width:180px;
                      "
                    >
                      Cleaning Type
                    </td>

                    <td
                      style="
                        padding:13px 0;
                        border-bottom:1px solid #e5e5e5;
                      "
                    >
                      ${escapeHtml(
                        formatLabel(
                          cleaningRequest.customerType
                        )
                      )}
                    </td>
                  </tr>


                  <tr>
                    <td
                      style="
                        padding:13px 0;
                        border-bottom:1px solid #e5e5e5;
                        font-weight:700;
                      "
                    >
                      Service
                    </td>

                    <td
                      style="
                        padding:13px 0;
                        border-bottom:1px solid #e5e5e5;
                      "
                    >
                      ${escapeHtml(
                        formatLabel(
                          cleaningRequest.serviceType
                        )
                      )}
                    </td>
                  </tr>


                  <tr>
                    <td
                      style="
                        padding:13px 0;
                        border-bottom:1px solid #e5e5e5;
                        font-weight:700;
                      "
                    >
                      Property Size
                    </td>

                    <td
                      style="
                        padding:13px 0;
                        border-bottom:1px solid #e5e5e5;
                      "
                    >
                      ${escapeHtml(
                        formatLabel(
                          cleaningRequest.propertySize
                        )
                      )}
                    </td>
                  </tr>


                  <tr>
                    <td
                      style="
                        padding:13px 0;
                        border-bottom:1px solid #e5e5e5;
                        font-weight:700;
                      "
                    >
                      Service Address
                    </td>

                    <td
                      style="
                        padding:13px 0;
                        border-bottom:1px solid #e5e5e5;
                      "
                    >
                      ${escapeHtml(
                        cleaningRequest.address
                      )}
                    </td>
                  </tr>


                  <tr>
                    <td
                      style="
                        padding:13px 0;
                        border-bottom:1px solid #e5e5e5;
                        font-weight:700;
                      "
                    >
                      Add-On Services
                    </td>

                    <td
                      style="
                        padding:13px 0;
                        border-bottom:1px solid #e5e5e5;
                      "
                    >
                      ${escapeHtml(addonText)}
                    </td>
                  </tr>

                </table>


                <!-- 24 HOUR PHONE CALL -->
                <div
                  style="
                    background:#050505;
                    color:#ffffff;
                    padding:24px;
                    margin-bottom:30px;
                  "
                >

                  <div
                    style="
                      color:#ef0011;
                      font-size:12px;
                      font-weight:700;
                      letter-spacing:2px;
                      text-transform:uppercase;
                      margin-bottom:10px;
                    "
                  >
                    Final Appointment Confirmation
                  </div>

                  <p
                    style="
                      margin:0;
                      color:#eeeeee;
                      font-size:15px;
                      line-height:1.7;
                    "
                  >
                    As a final confirmation, you will receive
                    a phone call approximately 24 hours before
                    your scheduled appointment to confirm the
                    appointment details and ensure everything
                    is ready for your cleaning service.
                  </p>

                </div>


                <p
                  style="
                    margin:0;
                    font-size:15px;
                    color:#555555;
                    line-height:1.7;
                  "
                >
                  If you have any questions or need to make a
                  change before your appointment, please contact
                  Nita's Cleaning Services at
                  <strong>843-653-5138</strong>.
                </p>


                <div
                  style="
                    margin-top:32px;
                    background:#ef0011;
                    color:#ffffff;
                    padding:18px 20px;
                    text-align:center;
                    font-size:14px;
                    font-weight:800;
                    letter-spacing:1px;
                  "
                >
                  YOUR APPOINTMENT IS CONFIRMED
                </div>

              </div>


              <!-- FOOTER -->
              <div
                style="
                  background:#050505;
                  color:#888888;
                  padding:22px 36px;
                  font-size:12px;
                  line-height:1.6;
                  text-align:center;
                "
              >
                Thank you for choosing
                Nita's Cleaning Services.
              </div>

            </div>
          </div>
        `,

        text: `
NITA'S CLEANING SERVICES
APPOINTMENT CONFIRMED

Thank you, ${customerName}.

Your cleaning request has been reviewed and approved.

CONFIRMED APPOINTMENT

Date:
${cleaningRequest.preferredDate}

Time:
${formatLabel(
  cleaningRequest.preferredTime
)}

Cleaning Type:
${formatLabel(
  cleaningRequest.customerType
)}

Service:
${formatLabel(
  cleaningRequest.serviceType
)}

Property Size:
${formatLabel(
  cleaningRequest.propertySize
)}

Service Address:
${cleaningRequest.address}

Add-On Services:
${addonText}

FINAL APPOINTMENT CONFIRMATION

As a final confirmation, you will receive a phone call
approximately 24 hours before your scheduled appointment
to confirm the appointment details and ensure everything
is ready for your cleaning service.

Questions or changes:
843-653-5138

Thank you for choosing Nita's Cleaning Services.
        `.trim(),
      });


    if (error) {
      console.error(
        "CUSTOMER CONFIRMATION EMAIL ERROR:"
      );

      console.error(error);

      return redirectToError(
        request,
        "The appointment could not be confirmed because the customer notification email failed."
      );
    }


    console.log(
      "APPOINTMENT APPROVED"
    );

    console.log(
      "CUSTOMER EMAIL SENT:",
      data?.id
    );


    /*
     * Redirect back to the approval page
     * instead of returning raw JSON.
     */
    const successUrl = new URL(
      "/approve-appointment",
      request.url
    );

    successUrl.searchParams.set(
      "status",
      "success"
    );

    return NextResponse.redirect(
      successUrl,
      303
    );

  } catch (error) {

    console.error(
      "APPROVE APPOINTMENT ERROR:",
      error
    );

    return redirectToError(
      request,
      "Unable to approve the appointment."
    );
  }
}