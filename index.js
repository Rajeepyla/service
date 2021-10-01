const express = require('express');
const gateway = require('fast-gateway');
const port = 9090;
const auth = (req,res,next)=>{
    if(req.headers.token && req.headers.token != ''){
     next();
    }
    else{
        res.send(JSON.stringify({status:401,message:'Authentication failed atach valid req'}))
    }
}
 const server = gateway({
     routes:[{
         prefix:'/posts',
         target:'http://localhost:1000/'
        
        //  middlewares:[auth]
     },
     {
        prefix:'/comments',
        target:'http://localhost:2000/'
    },
    {
        prefix:'/login',
        target:'http://localhost:3000/'
    },
    {
        prefix:'/register',
        target:'http://localhost:4000/'
    },
    ]
 });
 server.get('/mygateway',(req,res)=>{
    res.send('gateway is called')
 });
 server.start(port).then(()=>{
    console.log(`Api gateway is listening to port ${port}`);
}). catch((err)=>{
    console.log(err);

});