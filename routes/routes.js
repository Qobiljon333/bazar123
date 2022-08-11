const express = require('express');
const News = require('../models/model');
const router = express.Router();

router.post("/", async (req,res) => {
    try{
        const info = await News.create({
            title: req.body.title,
            content: req.body.content
        });
        const NewInfo = await info.save()
        res.json(NewInfo)
    }
    catch(err){
        res.send(err)
    }


    // const title = req.body.title ;
    // const content = req.body.content ;
    // const newNews = new News({title,content})
    // newNews.save()
})

router.get("/", async (req, res) => {
    const allProducts = await News.find();
    try {
      res.json(allProducts);
    } catch (err) {
      res.send("No results!", err);
    }
  });

module.exports = router;
