import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import generateSignature from './lib/google-maps-signature';
import 'dotenv/config'
const querystring = require('querystring');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = polka() // You can also use Express

if (dev) {
	// route for rewriting maps API requests to use our API key + sig
	app.get('/api/google-maps-proxy', (req, res) => {
		let endpoint = req.query.endpoint;
		let queryString = querystring.encode(req.query);

		let url = `https://maps.googleapis.com/maps/api/${endpoint}?${queryString}`

		url = generateSignature(url);

		let str = "redirecting..."
		res.writeHead(302, {
			Location: url
		});

		res.end(str);
	})

	app.get('/api/donate', (req, res) => {
		const url = `https://secure.actblue.com/donate/dec-dc-action`

	  let str = "redirecting..."
	  res.writeHead(302, {
	    Location: url
	  });

	  res.end(str);
	})

}

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
)

app.listen(PORT, err => {
	if (err) console.log('error', err);
});






