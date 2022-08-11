require("dotenv/config");
const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes/routes");
// cloudinary  codes
const app = express();
const { cloudinary } = require('./utills/cloudinary')

const cors = require("cors");

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => { 
    console.log("MongoDBga ulanish hosil qilindi...");
  })
  .catch((err) => {
    console.error("MongoDBga ulanish vaqtida xato ro'y berdi...", err);
  });

app.use(cors());
//  2 qator ham upload image codes
app.use(express.json({ limit:'50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use("/", routes);


// //  upload image codes 

( 
  app.post('/', async (req,res) => {
    try {
      const fileStr = req.body.data
      const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
        upload_preset:'dev_stepus'
      })

      console.log(uploadedResponse);
      res.json({ msg: "YAYAYA" })
  } catch (error) {
      console.error(error);
      res.status(500).json({err: 'Something went wrong'})
    }
  
  }))
  
  const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`${port}chi portni eshitishni boshladim...`);
});