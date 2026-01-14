// pages/api/admin/approve.js

const requests = global.__BOOKING_REQUESTS__ || (global.__BOOKING_REQUESTS__ = new Map());

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const adminKey = req.headers["x-admin-key"];
  if (adminKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { booking_request_id } = req.body || {};
  if (!booking_request_id) {
    return res.status(400).json({ error: "Missing booking_request_id" });
  }

  const record = requests.get(booking_request_id);
  if (!record) {
    return res.status(404).json({ error: "Request not found" });
  }

  record.status = "APPROVED";
  record.approvedAt = new Date().toISOString();

  requests.set(booking_request_id, record);

  res.status(200).json({ ok: true, status: "APPROVED", record });
};
