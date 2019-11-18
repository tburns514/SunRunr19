var db = require("../db");
var WeatherSchema = new db.Schema({
	temp:       Number,
        humidity:   Number,
        windSpeed:  Number
});
var activitySampleSchema = new db.Schema({
    start:        {type: Date, default: Date(0)},
    longitude:    Number,
    latitude:     Number,
    speed:        Number,
    uv:           Number,
    
});

var ActivitySample = db.model("ActivitySample", activitySampleSchema);

module.exports = ActivitySample;
