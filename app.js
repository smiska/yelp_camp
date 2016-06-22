// REQUIRE ALL IMPORTANT PACKAGES
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
 
// SET UP THE ENVIROMENT    
//mongoose.connect("mongodb://localhost/yelp_camp");   
mongoose.connect("mongodb://smiska:rusty@ds023428.mlab.com:23428/yelp_camp");   

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

// SET UP DATABASE SCHEMA
var campgroundSchema = new mongoose.Schema({
    name: String,
    img: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){

// RETRIVE ALL CAMPGROUND FROM DATABASE
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
    
});

// ADD A CAMPGROUND TO DB
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, img: image};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
       res.redirect("/campgrounds");
        }
    });
    
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
    res.send("This will be the show page one day!");
});

app.get("/carhire", function(req, res) {
    res.render("carhire");
});

app.get("/numerals", function(req, res) {
    res.render("numerals");
});

app.get("*", function(req, res) {
    res.render("star");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
    });