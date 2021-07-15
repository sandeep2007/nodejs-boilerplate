require('dotenv/config')
const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

//setup app & its routes
const app = express();
app.use(cors());
const routes = require('./routes/index.route');
app.use(routes);

//server credentials
const certificate = fs.readFileSync(path.join(__dirname, 'cert', 'selfsigned.crt'), 'utf8');
const privateKey = fs.readFileSync(path.join(__dirname, 'cert', 'selfsigned.key'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

//start http server
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT);
console.log(`[${process.env.SERVICE_NAME}] http server listening at port ${process.env.PORT}`);

//start https server
if (process.env.HTTPS === "true") {
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(parseInt(process.env.PORT) + 1);
    console.log(`[${process.env.SERVICE_NAME}] https server listening at port ${parseInt(process.env.PORT) + 1}`);
}

module.exports = { app };