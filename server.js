const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

// serve static contents
app.use(express.static('dist'));

// TODO proxy api request is not working. check why. for now add host name in all services.
// app.all("/api/*", (req, res) => {
//   apiProxy.web(req, res, {
//     target: 'https://party-server-app.herokuapp.com',
//     secure: true,
//     changeOrigin: true,
//     logLevel: "debug",
//     pathRewrite: {"^/api" : "https://party-server-app.herokuapp.com/api"}
//   });
// });

// fallback to index.html for SPA.
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT||4200);

console.log("server is running on "+ process.env.PORT||4200);
