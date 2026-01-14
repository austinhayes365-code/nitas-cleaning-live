const crypto = require("crypto");
const { square } = require("../../../lib/square");

// same in-memory store
const requests = global.__BOOKING_REQUESTS__ || (global.__BOOKING_REQUESTS__ = new Map());

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const { booking_request_id, token } = req.body || {};
  if (!booking_request_id || !token) {
    return res.status(400).json({ ok: false, error: "Missing booking_request_id or token" });
  }

  const record = requests.get(booking_request_id);
  if (!record) return res.status(404).json({ ok: false, error: "Request not found" });

  if (record.status !== "APPROVED") {
    return res.status(400).json({ ok: false, error: "Booking not approved yet" });
  }

  try {
    const idempotencyKey = crypto.randomUUID();

    // Charge $1.00 (100 cents)
    const { result } = await square.paymentsApi.createPayment({
      sourceId: token, // token from Web Payments SDK
      idempotencyKey,
      locationId: process.env.SQUARE_LOCATION_ID,
      amountMoney: {
        amount: record.depositCents,
        currency: record.currency || "USD",
      },
      autocomplete: true,
      note: `Deposit for booking request ${booking_request_id}`,
    });

    record.status = "DEPOSIT_PAID";
    record.depositPaidAt = new Date().toISOString();
    record.squarePaymentId = result.payment?.id;

    requests.set(booking_request_id, record);

    return res.status(200).json({ ok: true, status: record.status, paymentId: record.squarePaymentId });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
