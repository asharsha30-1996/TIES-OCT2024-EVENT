const express = require('express');

const mongoose = require('mongoose');


const app = express();


app.use(express.json())

mongoose.connect('mongodb+srv://asharsha30:$SaiMurugan1996@cluster0.hv9ii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  
useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.error('Error connecting to MongoDB:', err));





const sch = {

    name : String,
    email : String,

}

const monmodel = mongoose.model("master_datas",sch);



app.post("/post",async(req,res)=>{

    console.log("inside post data");
    const data = new monmodel({

        name : req.body.name,
        email : req.body.email,
        id : req.body.id
    });

    const val = await data.save();
    res.json(val);

})



app.listen(4000,()=>
    {   
        console.log('Listening')
    }
)
