const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const app = express();
const https = require("https");
const { off } = require("process");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",(req,res)=>{
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data={
        members: [
            {
            email_address:email,
            status: "subscribed",
            merge_fields:{
                FNAME : firstName,
                LNAME : lastName
                }
            }
        ]
    }

    app.post("/failure",(req,res)=>{
        res.redirect("/");
    })

    const jsonData = JSON.stringify(data);
    
    const url = "https://us18.api.mailchimp.com/3.0/lists/dee5a74503";

    const options = {
        method : "POST",
        auth : "prashant:d0204d8c4f618d1e4559ef09f581c88f-us18"
    }

    const request = https.request(url,options,(response)=>{
        console.log(response.statusCode);    
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
            // res.send("successfully subs")
        }  
        else{
            res.sendFile(__dirname + "/failure.html");
            // res.send("try again");
        }
    })
    request.write(jsonData);
    request.end();
});


//api keu
// d0204d8c4f618d1e4559ef09f581c88f-us18
// dee5a74503


//process.env.PORT use instead of 3000 to make work on heroku
app.listen(process.env.PORT||3000,()=>{
    console.log("server is running on port 3000");
})