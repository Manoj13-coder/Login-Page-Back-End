const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user').then((res)=>{
    console.log('Success');
}).catch((err)=>{
    console.log('Failure');
})
const Ps = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    recover : {
        type: String,
        required: true
    }
});
const Access1 = new mongoose.model('credentials',Ps);

module.exports = Access1;