const { square } = require("../../lib/square");

module.exports = async function handler(req, res) {
  try {
    const { result } = await square.locationsApi.listLocations();
    res.status(200).json({
      ok: true,
      env: process.env.SQUARE_ENV,
      locations: (result.locations || []).map((l) => ({
        id: l.id,
        name: l.name,
      })),
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};
