const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(object);
  response.end();
};

const success = (request, response) => {
  const responseXML = '<response><message>This is a successful response</message></response>';

  respondXML(request, response, 200, responseXML);
};

const badRequest = (request, response, params) => {
  let responseXML = '<response><message>This is a successful response</message></response>';

  if (!params.valid || params.valid !== 'true') {
    responseXML = '<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>';
    return respondXML(request, response, 400, responseXML);
  }

  return respondXML(request, response, 200, responseXML);
};

const unauthorized = (request, response, params) => {
  let responseXML = '<response><message>This is a successful response</message></response>';

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseXML = '<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>';
    return respondXML(request, response, 401, responseXML);
  }

  return respondXML(request, response, 200, responseXML);
};

const forbidden = (request, response) => {
  const responseXML = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';

  respondXML(request, response, 403, responseXML);
};

const internal = (request, response) => {
  const responseXML = '<response><message>Internal Server Error. Something went wrong.</message><id>InternalError</id></response>';

  respondXML(request, response, 500, responseXML);
};

const notImplemented = (request, response) => {
  const responseXML = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';

  respondXML(request, response, 501, responseXML);
};


const notFound = (request, response) => {
  const responseXML = '<response><message>The page you are looking for was not found</message><id>notFound</id></response>';

  respondXML(request, response, 404, responseXML);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
