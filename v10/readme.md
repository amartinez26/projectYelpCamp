# Editing campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit page
* Add Update Route
* Fix $set problem

# Deleting Campgrounds
* Add Destroy Route
* Add Delete button

# Authorization Part 1: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit route for comments
* Add Edit buttons
* Add Update route

* /campgrounds/:id/edit
* /campgrounds/:id/comments/:comment_id/edit

# Deleting Comments
* Add Destroy route
* Add Delete button

* Campground Destroy Route: /campgrounds/:id
* Campground Destroy route: /campground/:id/comments/:comment_id

# Authorization PArt 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware