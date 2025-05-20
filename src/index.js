import express from 'express';

const server = express();

const PORT = process.env.PORT || 3000;

server.get("/", ()=>{});

server.listen(PORT, () =>{})