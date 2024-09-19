const express = require('express');
const helmet = require('helmet');
const app = express();





module.exports = app;


app.use(helmet({
	helmet: true,
	frameguard: {
		action: 'DENY'
	},
	ContentSecurityPolicy : {   
		detectives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", 'trusted-cdn.com'],
		}
	}, // CSP protects against XSS vulns, undesired tracking, malicious frames, and much more.
	dnsPrefetchControl: true, //enabled - Disables DNS prefetching
	noCache: true, // enabled - Disables client-side caching
	hsts: { 
		maxAge: timeInSeconds=7776000,
		force: true,
	}, // helmet.hsts asks browser to access site via HTTPS only - mounted for period of 90-Days in seconds.

}));

app.use(
	helmet({
		noSniff: true, // Prevention of browser sniffing MIME type.
		ieNoOpen: true, // middleware mounted to prevent opening untrusted HTML content on IE browser.
		hidePoweredBy: true, // Removes the X-powered-By header
		xssFilter: true, // middleware for XSS protection HTTP header
}));




const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
