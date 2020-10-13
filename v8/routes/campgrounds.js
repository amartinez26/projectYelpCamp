let express    = require("express"),
    router     = express.Router(),
	Campground = require("../models/campground");
//=======================
//  Campground Routes
//=======================

//INDEX - show all campgrounds
router.get("/", function(req,res){
	req.user
	//Get all campgrounds from DB
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			console.log("err");
		}else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	})
});

//CREATE - add new campground to database
router.post("/", function(req,res){
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
router.get("/new", function(req,res){
	res.render("campgrounds/new");
});

//SHOW - shows more info about the campground
router.get("/:id", function(req,res){
	//Find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			// render show template with that campground
	        res.render("campgrounds/show",{campground:foundCampground});
		}
	});
});

module.exports = router;