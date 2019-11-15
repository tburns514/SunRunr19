var db = require("../db");
ActivitySample = require('./activitySample.js');

ActivitySampleSchema = db.model("ActivitySample").schema;

var activitySchema = new db.Schema({ 
    start:        { type: Date, default: Date.now },
    type:         String,
    num:          Number,
    date:         { type: Date, default: Date.now },
    samples:      {type: [ActivitySampleSchema], default:[]},
    end:          { type: Date, default: Date.now },
    deviceId:     String,
    apikey:       String,
    userEmail:    String
    
});

var Activity = db.model("Activity", activitySchema);

module.exports = Activity;
