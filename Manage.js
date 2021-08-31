const express = require('express');
const app = express();
const Access1 = require('./Enter.js');
app.use(express.urlencoded());
app.use(express.json());
app.post('/Signup',async(req,res)=>{
    const {email,password,recover} = req.body;
    if(!email || !password || !recover){
        return res.status(400).json('Invalid credentials');
    }else{
        try{
            const data = await Access1.findOne({email : email});
            if(data){
                return res.status(400).json('Account already exist');
            }else{
                try{
                    const x = new Access1({
                        email : email,
                        password : password,
                        recover : recover
                    });
                    await x.save();
                    return res.status(200).json('Signup successfull');
                }catch(err){
                    return res.status(404).json('Unknown error');
                };
            }
        }catch(err){
            return res.status(404).json('Unknown error');
        }
    }
});
app.post('/Login',async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json('Invalid credentials');
    }else{
        try{
            const data = await Access1.findOne({email : email});
            const match = JSON.stringify(data);
            const pass = JSON.parse(match);
            if(pass.password !== password){
                return res.status(400).json('Incorrect password or email');
            }else{
                return res.status(200).json('Login successfull');
            }
        }catch(err){
            return res.status(404).json('Unknown error');
        }
    }
});
app.post('/Forgot',async(req,res)=>{
    const {email,recover,password} = req.body;
    if(!email || !recover || !password){
        return res.status(400).json('Invalid credentials');
    }else{
        try{
            const data = await Access1.findOne({email : email});
            const match = JSON.stringify(data);
            const pass = JSON.parse(match);
            if(pass.recover === recover){
                await Access1.updateOne({email : email},{
                    $set:{
                        password : password
                    }
                });
                return res.status(200).json('Successfully changed your password');
            }else{
                return res.status(400).json('Incorrect hash or email');
            }
        }catch(err){
            return res.status(404).json('Unknown error');
        }
    }
});
app.post('/Delete',async(req,res)=>{
    const {email,recover,password} = req.body;
    if(!email || !recover || !password){
        res.status(400).json('Invalid credentials');
    }else{
        try{
            const data =  await Access1.findOne({email : email});
            const match = JSON.stringify(data);
            const pass = JSON.parse(match);
            if(pass.password === password && pass.recover === recover){
                await Access1.deleteOne({email : email});
                return res.status(200).json('Bye Bye see you again :(');
            }else{
                return res.status(400).json('Invalid email or hash or password');
            }
        }catch(err){
            return res.status(404).json('Unknown error');
        }
    }
});
app.listen(5000,()=>{
    console.log('Server listening on port 5000');
});