const generateSignature = rquire("../src/lib/google-maps-signature");
const querystring = require('querystring');

module.exports = (req, res) => {
  let endpoint = req.query.endpoint;
  let queryString = querystring.encode(req.query);

  let url = `https://maps.googleapis.com/maps/api/${endpoint}?${queryString}`

  url = generateSignature(url);

  let str = "redirecting..."
  res.writeHead(302, {
    Location: url
  });

  res.end(str);
};
