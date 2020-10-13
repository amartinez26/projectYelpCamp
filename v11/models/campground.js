const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/yelp_camp_v10', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to DB!'))
// .catch(error => console.log(error.message));
// mongoose.set("useFindAndModify", false);

//Schema Setup
let campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Campground", campgroundSchema);