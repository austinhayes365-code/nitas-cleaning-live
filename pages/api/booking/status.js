const requests = global.__BOOKING_REQUESTS__ || (global.__BOOKING_REQUESTS__ = new Map());

module.exports = async function handler(req, res) {
  const id = req.query.id;
  if (!id) return res.status(400).json({ ok: false, error: "Missing id" });

  const record = requests.get(id);
  if (!record) return res.status(404).json({ ok: false, error: "Not found" });

  // Return only what the browser needs
  return res.status(200).json({
    ok: true,
    id: record.id,
    status: record.status,
    depositCents: record.depositCents,
    currency: record.currency,
  });
};
