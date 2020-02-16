const express = require('express');
const nunjucks = require('nunjucks');
const router = require("./router");


const server = express();


server.use(express.urlencoded({extended:true}));
server.use(express.static('public'));
server.use(router);


server.set("view engine", "njk"); 

nunjucks.configure("views",{
    express:server
})




server.listen(5000,function(req,res){
    console.log("server is running")
})

