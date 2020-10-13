let express = require("express");
let app = express();
let bodyParser = require("body-parser");

	let campgrounds = [
		{name:"Salmon Creek", image:"https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Granite Hill", image:"https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Mountain Goat's Rest", image:"https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Salmon Creek", image:"https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Granite Hill", image:"https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Mountain Goat's Rest", image:"https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Salmon Creek", image:"https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Granite Hill", image:"https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Mountain Goat's Rest", image:"https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&h=350"}
	]

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
	res.render("landing");
});

app.get("/campgrounds", function(req,res){
	
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res){
	//get data from form & add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let newCampground = {name:name, image:image};
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
	res.render("new.ejs");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The YelpCamp Server Has Started");
});