// pages/api/booking/request.js
const crypto = require("crypto");

// TEMP storage (in-memory). We'll replace with a database in Step 4.
const requests = global.__BOOKING_REQUESTS__ || (global.__BOOKING_REQUESTS__ = new Map());

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { service, date, time, name, email, notes } = req.body || {};
  if (!service || !date || !time || !name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Combine date + time into ISO string (local time). We'll refine timezone later.
  const startAt = new Date(`${date}T${time}:00`).toISOString();

  const id = crypto.randomUUID();
  const record = {
  id,
  status: "PENDING",
  service,
  startAt,
  name,
  email,
  notes: notes || "",
  depositCents: 100, // $1.00 deposit for now
  currency: "USD",
  createdAt: new Date().toISOString(),
};


  requests.set(id, record);

  res.status(200).json({ ok: true, booking_request_id: id, status: "PENDING" });
};
