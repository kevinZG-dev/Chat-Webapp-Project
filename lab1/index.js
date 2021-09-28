// Import a module
const http = require('http')
const url = require('url')
const qs = require('querystring')
// Define a string constant concatenating strings
const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World!</p>' +
'    </body>' +
'</html>'
const serverHandle = function (req, res) {
  // Retrieve and print the queryParams
  const queryParams = qs.parse(url.parse(req.url).query);
  console.log(queryParams);

  // Retrieve and print the current path
  const route = url.parse(req.url)
  const path = route.pathname 
  const params = qs.parse(route.query)

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
}


// Declare an http server
http.createServer(function (callback) {

  callback(req,res);

// Start the server
})

const server = http.createServer(serverHandle);
server.listen(8080)
