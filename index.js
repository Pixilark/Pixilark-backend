const express = require("express");
const app = express();
const cors = require('cors');
var nodemailer = require("nodemailer");

//mail apiservice here
const mailjet = require("node-mailjet").connect(
  "84cc1be3e507754396f9078efe815ae1",
  "14c3e86f1706eeed796ed67f0354cfea"
);
const request = mailjet;

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: '*'
}))

app.get("/", (req, res) => {
  res.send("Pixilark Backend Server");
});

app.post("/sendmail", (req, res) => {
  const data = req.body;
  console.log(data)
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pixilark00@gmail.com",
      pass: "Pixilark@2021",
    },
  });

  let info = {
    from: "pixilark00@gmail.com", // sender address
    to: "pixilark00@gmail.com", // list of receivers
    subject: `Query from ${data["name"]}`, // Subject line
    text: `from: - ${data['email']} \n name:- ${data['name']} \n ${data['text']}`, // plain text body
  }; 
  try {
    mailTransporter.sendMail(info, function (err, data) {
      if (err) {
          res.send({
              sucess:false,
              error:err
          })
      } else {
        res.send({sucess:true})
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
        sucess:false,
        error:error
    })
    // after()
  }
});

app.listen(port, () => {
  console.log(`Connection setup at port no ${port}`);
});
