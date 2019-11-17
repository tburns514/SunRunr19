let express = require('express');
let router = express.Router();
let fs = require('fs');
let jwt = require("jwt-simple");
let Device = require("../models/device");
let Activity = require("../models/activity");
let User = require("../models/users");
let request = require('request');

// Secret key for JWT
let secret = fs.readFileSync(__dirname + '/../../jwtkey').toString();
let authenticateRecentEndpoint = true;
var num = 1;

function authenticateAuthToken(req) {
    // Check for authentication token in x-auth header
    if (!req.headers["x-auth"]) {
        return null;
    }
   
    let authToken = req.headers["x-auth"];
   
    try {
        let decodedToken = jwt.decode(authToken, secret);
        return decodedToken;
    }
    catch (ex) {
        return null;
    }
}

router.post("/record", function(req, res) {
        let responseJson = {
        success : false,
        message : "",
        
    };
	
	console.log("here");
	if( !req.body.hasOwnProperty("deviceId") ) {
        responseJson.message = "Request missing deviceId parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }
    
    if( !req.body.hasOwnProperty("apikey") ) {
        responseJson.message = "Request missing apikey parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }
    
   // if( !req.body.hasOwnProperty("start") ) {
   //     responseJson.message = "Request missing start parameter.";
  //      return res.status(201).send(JSON.stringify(responseJson));
 //   }
    
    //if( !req.body.hasOwnProperty("type") ) {
   //     responseJson.message = "Request missing type parameter.";
  //      return res.status(201).send(JSON.stringify(responseJson));
 //   }
    
   // if( !req.body.hasOwnProperty("num") ) {
  //      responseJson.message = "Request missing num parameter.";
  //      return res.status(201).send(JSON.stringify(responseJson));
   // }
//	if( !req.body.hasOwnProperty("date") ) {
  //      responseJson.message = "Request missing date parameter.";
 //       return res.status(201).send(JSON.stringify(responseJson));
  //  }
//	if( !req.body.hasOwnProperty("samples") ) {
 //       responseJson.message = "Request missing samples parameter.";
//        return res.status(201).send(JSON.stringify(responseJson));
//    }
//	if( !req.body.hasOwnProperty("end") ) {
   //     responseJson.message = "Request missing end parameter.";
 //       return res.status(201).send(JSON.stringify(responseJson));
//    }
	if( !req.body.hasOwnProperty("userEmail") ) {
        responseJson.message = "Request missing userEmail parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }
        //change lat and lon to come from device
	request({
       method: "GET",
       uri: "http://api.openweathermap.org/data/2.5/weather?lat=32.19&lon=-110.97&units=imperial&appid=092b2e289298b368fb3c48b8b747b8af",
       
    },function(err, res){
		console.log(res.body);
	});



var activity = new Activity({
                     start: req.body.start,
                     type:         req.body.type,
					 num:          num,
					 date:         Date.now(),
					 end:          req.body.end,
					 deviceId:     req.body.deviceId,
					 apikey:       req.body.apikey,
					 userEmail:    req.body.userEmail

                 });
                 responseJson.message = "New activity recorded.";               

             // Save the activity data. 
             activity.save(function(err, newActivity) {
                 if (err) {
                     responseJson.status = "ERROR";
                     responseJson.message = "Error saving data in db." + err;
                     return res.status(201).send(JSON.stringify(responseJson));
                 }

                 responseJson.success = true;
                 return res.status(201).send(JSON.stringify(responseJson));
            });







	
	
	
	
	num++;
});



// GET: Returns all Activites first reported in the previous specified number of days
// Authentication: Token. A user must be signed in to access this endpoint
router.get("/summary/:days", function(req, res) { 
    console.log("Entered");
    let days = req.params.days;
        let responseJson = {
        success: true,
        message: "",
        activities: [],
    };
    
    if (authenticateRecentEndpoint) {
        var decodedToken = authenticateAuthToken(req);
        if (!decodedToken) {
            responseJson.success = false;
            responseJson.message = "Authentication failed";
            return res.status(401).json(responseJson);
        }
    }
    
    
    // Check to ensure the days is between 1 and 365 (inclsuive), return error if not
    if (days < 1 || days > 365) {
        responseJson.success = false;
        responseJson.message = "Invalid days parameter.";
        return res.status(200).json(responseJson);
    }
    
    // Find all potholes reported in the spcified number of days
    let activitiesQuery = Activity.find({
        "date": 
        {
            $gte: new Date((new Date().getTime() - (days * 24 * 60 * 60 * 1000)))
        },

	"userEmail": decodedToken.email
	
    }).sort({ "date": -1 });
    
    
    activitiesQuery.exec({}, function(err, activities) {
        if (err) {
            responseJson.success = false;
            responseJson.message = "Error accessing db.";
            return res.status(200).send(JSON.stringify(responseJson));
        }
        else {  
            let numActivities = 0;
			
            for (let a of activities) {
                // Add pothole data to the respone's potholes array
                numActivities++; 
		
                responseJson.activities.push({
                    type: a.type,
					date: a.date,
					start: a.start,
					end: a.end,
					uv: a.uv,
					weather: {temp: 78, humidity: 5}
                    
                });
            }
            responseJson.message = "In the past " + days + " days, " + numActivities + " activities have been recorded.";
            return res.status(200).send(JSON.stringify(responseJson));
        }
    })
});


module.exports = router;
