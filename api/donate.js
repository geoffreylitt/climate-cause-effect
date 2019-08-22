module.exports = (req, res) => {
  const url = `https://secure.actblue.com/donate/dec-dc-action`

  console.log(`[${Date.time()}] User clicked donate link`)

  let str = "redirecting..."
  res.writeHead(302, {
    Location: url
  });

  res.end(str);
};
