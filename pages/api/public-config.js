module.exports = function handler(req, res) {
  res.status(200).json({
    ok: true,
    applicationId: process.env.SQUARE_APP_ID,
    locationId: process.env.SQUARE_LOCATION_ID,
    env: process.env.SQUARE_ENV,
  });
};
