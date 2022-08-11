const mongoose = require ('mongoose');

const newsSchema ={
    title:String,
    content:String,
}

const News = mongoose.model("News",newsSchema);

module.exports = News