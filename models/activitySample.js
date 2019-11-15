var db = require("../db");
var WeatherSchema = new db.Schema({
	temp:       Number,
        humidity:   Number,
        windSpeed:  Number
});
var activitySampleSchema = new db.Schema({
    type:         String,
    num:          Number,
    weather:      WeatherSchema,
    longitude:    Number,
    latitude:     Number,
    speed:        Number,
    uv:           Number,
    apikey:       String,
    deviceId:     String,
    userEmail:    String,
    submitTime:   { type: Date, default: Date.now }
    
});

var ActivitySample = db.model("ActivitySample", activitySampleSchema);

module.exports = ActivitySample;
