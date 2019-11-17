var db = require("../db");
var WeatherSchema = new db.Schema({
	temp:       Number,
        humidity:   Number,
        windSpeed:  Number
});
var activitySampleSchema = new db.Schema({
    longitude:    Number,
    latitude:     Number,
    speed:        Number,
    uv:           Number,
    submitTime:   { type: Date, default: Date.now }
    
});

var ActivitySample = db.model("ActivitySample", activitySampleSchema);

module.exports = ActivitySample;
