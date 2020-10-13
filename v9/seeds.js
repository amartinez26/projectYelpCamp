    let mongoose = require("mongoose");
    let Campground = require("./models/campground");
    let Comment   = require("./models/comment");
     
    let seeds = [
        {
            name: "Cloud's Rest", 
            image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
            description: "Burton coolibar crispi danner gossamer gear grangers ground effect ibex ingenius lafuma molehill option snowboards poorboy probar voile. B.o.b carhartt coleman dalbello sports dohm icebox usa elan grangers keen navarro outward bound - vobs turtle fur wildwasser. Aire alpina atomic benchmade billabong climashield croakies ingenius jet lites kerma leatherman montbell mountain hardwear national geographic nikwax nixon seal skinz storm show studios the canyons turtle fur valandre."
        },
        {
            name: "Desert Mesa", 
            image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
            description: "B by burton carhartt columbia dansko eagle creek five ten flow fox river havaianas head trip klearwater kuhl marin naxo pieps princeton tec r.e.d. rail riders tecnica teko third eye. Betty rides black diamond brunton charlet moser coghlan's cup pour pi drop epic sport general ecology hennessy hammock kershaw kuhl mad rock neos omega pacific prijon rip curl sickle stonewear designs watchful eye designs. Arbor astral betty rides bush buddy byer of maine carb boom cateye chaco croakies descente ex officio exped fritschi diamir head kershaw nike osprey paxton's probar seven2 simple swiss army turbo charge vans werner white rock wilderness press."
        },
        {
            name: "Canyon Floor", 
            image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
            description: "Aqua-bound atlas atomic bending branches crumpler gallaz golite grangers head skis usa highgear lorpen molehill novara pieps silva siver cartel spyderco woolrich. Backcountry access bozeman mountain works buck knives camelbak extrasport gnu gv snowshoes leki look oware pearl izumi seattle sports sog sterling rope suunto teton gravity research wildwasser. Altrec america's cup brinkmann caribou mountaineering cocoon gossamer gear gregory hot chilly's jet lites keen kokatat leatherman mad rock maglite montrail mountain tools open country osprey otter paxton's prijon rip curl rottefella slumberjack tubbs volkl wilderness press wildwasser."
        }
    ];


    /////////////////////////////////////////////////  Async function

  async function seedDB(){
	  try{ 	  
		  await Campground.remove({});
		  console.log('Campgrounds removed');
		  await Comment.remove({});
		  console.log('Comments removed');

		  for(const seed of seeds){
		  let campground = await Campground.create(seed);
		  console.log('Campground created');
		  let comment = await Comment.create(
		  {
		  text: "This place is great, but I wish there was internet",
		  author: "Homer"
		  }
		  )
		  console.log('Comment created');
		  campground.comments.push(comment);
		  campground.save();
		  console.log('Comment added to campground');
		  }
		  
	  } catch(err){
		  console.log(err);
	  }
  }


	
	
	////////////////////////////////////////////// the following was refactored to async fnction above
     
    // function seedDB(){
    //    //Remove all campgrounds
    //    Campground.remove({}, function(err){
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log("removed campgrounds!");
    //         Comment.remove({}, function(err) {
    //             if(err){
    //                 console.log(err);
    //             }
    //             console.log("removed comments!");
    //              //add a few campgrounds
    //             data.forEach(function(seed){
    //                 Campground.create(seed, function(err, campground){
    //                     if(err){
    //                         console.log(err)
    //                     } else {
    //                         console.log("added a campground");
    //                         //create a comment
    //                         Comment.create(
    //                             {
    //                                 text: "This place is great, but I wish there was internet",
    //                                 author: "Homer"
    //                             }, function(err, comment){
    //                                 if(err){
    //                                     console.log(err);
    //                                 } else {
    //                                     campground.comments.push(comment);
    //                                     campground.save();
    //                                     console.log("Created new comment");
    //                                 }
    //                             });
    //                     }
    //                 });
    //             });
    //         });
    //     }); 
    // }
     
    module.exports = seedDB;