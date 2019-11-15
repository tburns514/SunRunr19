var db = require("../db");
ActivitySample = require('./activitySample.js'),
var ActivitySampleSchema = db.model("ActivitySample").schema,

var activitySchema = new db.Schema({ 
    start:        { type: Date, default: Date.now },
    type:         String,
    num:          Number,
    date:         { type: Date, default: Date.now },
    samples:      [activitySampleSchema],
    end:          { type: Date, default: Date.now },
    deviceId:     String,
    userEmail:    String,
    
});

var Activity = db.model("Activity", activitySchema);

module.exports = Activity;
