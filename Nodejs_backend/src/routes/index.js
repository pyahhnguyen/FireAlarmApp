// routes/index.js
const express = require("express");
const router = express.Router();
const { apikey, permission } = require("../auth/chechAuth");
// check apiKey
router.use(apikey);
// check permission 
router.use(permission('0000'));
// authen route
router.use('/v1/api', require('./access/index'));
// sensor route
router.use('/v1/api', require('./sensor/index'));
// Root routes
router.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the backend of SafeGuard.com",
  });
});

module.exports = router;
