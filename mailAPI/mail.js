var http = require("http");
var url = require("url");
var mailer = require("nodemailer");
var email 	= require("emailjs");
var mysql = require('mysql');

http.createServer(function(req, res) {

    var parsedUrl = url.parse(req.url, true);
    var queryObject = parsedUrl.query;    
    var respuesta = {};

    var server 	= email.server.connect({
        user:    "devdesarrollo1@gmail.com", 
        password: "", 
        host:    "smtp.gmail.com", 
        ssl:     true
    });

    if (!queryObject.token){
        respuesta.status = "error";
        respuesta.message = "no se ha especificado token o es incorrecto";
        res.end(JSON.stringify(respuesta));
    } else {
         if (queryObject.token != "digus") {
            respuesta.status = "error";
            respuesta.message = "token es incorrecto";
            res.end(JSON.stringify(respuesta));
         }
    }
    if (!queryObject.datasource){
        respuesta.status = "error";
        respuesta.message = "no se ha especificado data source";
        res.end(JSON.stringify(respuesta));
    }
    
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'phpmyadmin',
        password : '1234',
        database : 'kiosco'
    });
    var query = 'SELECT * from mailproveedores where idmail=' + queryObject.datasource;
    connection.connect();
    
    connection.query(query, function(err, rows, fields) {
        if (!err) {
            server.send({
                text:    rows.detalle, 
                from:    'Diego y Gustavo', 
                to:      '<' + rows.mailproveedor + '>',
                subject: rows.asunto
            }, function(err, message) { 
                if (!err) {
                    respuesta.status = 'error';
                    respuesta.message = JSON.stringify(err);
                } else {
                    respuesta.status = 'ok';
                    respuesta.message = 'mail enviado correctamente';
                }
                res.end(JSON.stringify(respuesta)); 
            });
        } else {
            respuesta.status = 'error';
            respuesta.message = 'Error while performing query: ' + JSON.stringify(err);
            res.end(JSON.stringify(respuesta));
        }
    });
    connection.end();

}).listen(8008);

console.log("Server listening on port 8008");