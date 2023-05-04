const express=require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan =require('morgan');
// const {PORT}=require('./config/serverconfig');
const ratelimit=require("express-rate-limit");
const axios=require('axios');
const PORT=3005;
const app=express();

const limiter=ratelimit({
    windowMs: 2*60*1000,
    max:5
})

app.use(morgan('combined'));
app.use(limiter);
app.use('/bookingservice',async (req,res,next)=>{
    console.log(req.headers['x-access-token']);
    try {
        const response=await axios.get('http://localhost:3001/api/v1/isAuthenticated',{
        headers:
        {
            'x-access-token':req.headers['x-access-token']
        }
    });
    console.log(response.data);
    if(response.data.success)
    {
        next();
    }
    else
    {
        return res.status(401).json({
           message:"Unauthorised User", 
        })
    
    }
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorised User"
        })
    }
    
})

app.use('/bookingservice',createProxyMiddleware({target:'http://localhost:3002',changeOrigin:true}))
app.get('/home',(req,res)=>{
    return res.json({message:'OK'});
})

app.listen(PORT,()=>{
    console.log('Server started at Port',PORT);
})