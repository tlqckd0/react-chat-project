import ReactDomServer from 'react-dom/server';
import React from 'react';
import express from 'express';
import http from 'http';
import App from './src/App';

// const express = require("express");
// const http = require('http');

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/public',express.static('dist'));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get('*',(req,res,next)=>{
    const html = ReactDomServer.renderToString(<App/>);
    res.render('index',{markup:html});
})

server.listen(port,()=>console.log(`started at port ${port}`));