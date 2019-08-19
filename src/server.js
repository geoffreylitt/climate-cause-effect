import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import generateSignature from './lib/google-maps-signature';
import 'dotenv/config'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	// route for rewriting maps API requests to use our API key + sig
	.get('/maps/api/*', (req, res) => {
		let url = `https://maps.googleapis.com${req.url}`

		url = generateSignature(url);

		let str = "redirecting..."
		res.writeHead(302, {
			Location: url
		});

		res.end(str);
	})
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});






