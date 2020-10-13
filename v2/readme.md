# Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

RESTFUL Routes
name      url              verb    desc.     
===================================================================
INDEX    /campgrounds      GET     Display a list of all campgrounds
NEW      /campgrounds/new  GET     Displays form to make a new campground
CREATE   /campgrounds      POST    Add new campground to DB
SHOW     /campgrounds/:id  GET     Shows info about one campground
