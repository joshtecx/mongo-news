// ==================================
// DEPENDENCIES
// ==================================
const express = require("express");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const db = require("./models");
const axios = require("axios");
const logger = require("morgan");
const expHbars = require('express-handlebars');
const path = require("path");

// INITIALIZE EXPRESS
const app = express();

const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// HANDLEBARS
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", expHbars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// CONNECT TO MONGO
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoNews";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const result = {};
// ROUTES
app.get("/scrape", function(req, res){
    axios.get("http://nytimes.com").then(function(response) {
        const $ = cheerio.load(response.data);

        $(".story-heading").each(function(i, element){
            

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            db.Article.create(result)
                .then(function(dbArticle){
                    console.log(dbArticle)
                    res.redirect("/");
                })
                .catch(function(err){
                    return res.json(err);
                });
        });
        res.send("Scraped!");
    });
});

app.get("/", function(req, res){
    db.Article.find({})
        .then(function(dbArticle){
           res.render("index", {result: dbArticle});
        }).catch(function(err){
            return res.json(err);
        });
});

app.get("/articles/:id", function(req, res) {
    db.Article.findOne({_id: req.params.id})
        .populate("note")
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            res.json(err);
        });
});
// START SERVER
app.listen(PORT, function(){
    console.log(`App is now listening on port ${PORT} !`);
});