const generateSignature = require("../src/lib/google-maps-signature");

module.exports = (req, res) => {
  let url = `https://maps.googleapis.com${req.url}`

  url = generateSignature(url);

  let str = "redirecting..."
  res.writeHead(302, {
    Location: url
  });

  res.end(str);
};
