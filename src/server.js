const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const xmlHandler = require('./xmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// object for JSON requests
const jsonLib = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  '/notFound': jsonHandler.notFound,
};

// object for XML requests
const xmlLib = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': xmlHandler.success,
  '/badRequest': xmlHandler.badRequest,
  '/unauthorized': xmlHandler.unauthorized,
  '/forbidden': xmlHandler.forbidden,
  '/internal': xmlHandler.internal,
  '/notImplemented': xmlHandler.notImplemented,
  '/notFound': xmlHandler.notFound,
};

const onRequest = (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const type = request.headers.accept;

  // if statement that checks content type
  if (type === 'text/xml') {
    if (xmlLib[parsedUrl.pathname]) {
      xmlLib[parsedUrl.pathname](request, response, params);
    } else {
      xmlHandler.notFound(request, response, params);
    }
  } else if (jsonLib[parsedUrl.pathname]) {
    jsonLib[parsedUrl.pathname](request, response, params);
  } else {
    jsonHandler.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
