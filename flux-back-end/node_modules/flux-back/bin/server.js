const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');
 const app = require('../src/app')
 
 const PORT = normalizePort(process.env.PORT || 3000);
 app.set('port',PORT);
 
 const server = http.createServer(app);
 const router = express.Router();
 
 const route = router.get('/',(req,res,next)=>{
     res.status(200).send({
         title:"Flux API",
         version: "0.0.1"
     });
 });
 
 app.get('/hello-world',(req,res)=>{
    res.send('Hello world')
 });



 app.use('/',route);
 server.listen(PORT,()=>{
     console.log('Server rodando na porta ' + PORT);
 });

  // TRATANDO ERROS DO SERVIDOR

 server.on('error', onError);
 server.on('listening', onListening)
 
 
 function normalizePort(val){
     const port  = parseInt(val,10);
 
     if(isNaN(port)){
         return val;
     }
     if(port >= 0){
         return port;
     }
 
     return false;
 }
 
 function onError(error){
     if(error.syscall !== 'listen'){
         throw error;
     }
 
     const bind = typeof PORT === 'string' ?
     'Pipe ' + PORT : 
     'Port ' + PORT;
 
     switch (error.code) {
         case 'EACESS':
             console.error(bind + ' requires elevated previleges');
             process.exit(1);
             break;
         case 'EADDRINUSE': 
             console.error(bind + ' is already in use');  
             process.exit(1);
             break;
         default:
             throw error;
     }
 }
 
 function onListening(){
     const addr = server.address();
     const bind = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'port ' + addr.port;
     debug('listening on ' + bind);
 }