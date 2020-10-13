let express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
	passport      = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground    = require("./models/campground"),
	seedDB        = require("./seeds"),
	Comment       = require("./models/comment"),
	flash         = require("connect-flash"),
	User          = require("./models/user");

// requiring routes
   let commentRoutes    = require("./routes/comments"),
	   campgroundRoutes = require("./routes/campgrounds"),
	   indexRoutes      = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/yelp_camp_v10', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
mongoose.set("useFindAndModify", false);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();  //seed the database

//Passport Config
app.use(require("express-session")({
	secret: "Authenticate",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
								
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The YelpCamp Server Has Started");
});