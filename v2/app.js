let express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//Schema Setup
let campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 	 name:"Granite Hill", 
// 	 image:"https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&h=350",
// 	 description:"This is a huge granite hill, no bathrooms. No water. Beautiful Granite!"
// 	},
// 	function(err,campground){
// 	if(err){
// 		console.log("err");
// 	}else{
// 		console.log("Newly created campground")
// 		console.log(campground);
// 	}
// });

	// let campgrounds = [
	// 	{name:"Salmon Creek", image:"https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name:"Granite Hill", image:"https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name:"Mountain Goat's Rest", image:"https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name:"Salmon Creek", image:"https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name:"Granite Hill", image:"https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name:"Mountain Goat's Rest", image:"https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name:"Salmon Creek", image:"https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name:"Granite Hill", image:"https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name:"Mountain Goat's Rest", image:"https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&h=350"}
	// ]

app.get("/", function(req,res){
	res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res){
	//Get all campgrounds from DB
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			console.log("err");
		}else{
			res.render("index",{campgrounds:allCampgrounds});
		}
	})
});

//CREATE - add new campground to database
app.post("/campgrounds", function(req,res){
	//get data from form & add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let newCampground = {name:name, image:image, description: desc};
	
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
			console.log("");		
		}else{
			//redirect back to campgrounds page
	        res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req,res){
	res.render("new.ejs");
});

//SHOW - shows more info about the campground
app.get("/campgrounds/:id", function(req,res){
	//Find campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			// render show template with that campground
	        res.render("show",{campground:foundCampground});
		}
	});
});


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The YelpCamp Server Has Started");
});