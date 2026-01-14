// pages/api/admin/requests.js

// Using the same in-memory store from Step 3
const requests = global.__BOOKING_REQUESTS__ || (global.__BOOKING_REQUESTS__ = new Map());

module.exports = async function handler(req, res) {
  // Simple protection
  const adminKey = req.headers["x-admin-key"];
  if (adminKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const all = Array.from(requests.values());
  const pending = all.filter(r => r.status === "PENDING");

  res.status(200).json({ ok: true, pending });
};
