const fs = require("fs")
const circularJSON = require('circular-json')

var black = "\x1b[30m";
var red = "\x1b[31m";
var green = "\x1b[32m";
var yellow = "\x1b[33m";
var blue = "\x1b[34m";
var magenta = "\x1b[35m";
var cyan = "\x1b[36m";
var white = "\x1b[37m";
var Reset = "\x1b[0m";
var bright = "\x1b[1m";
var dim = "\x1b[2m";

exports.black = black
exports.red = red
exports.green = green
exports.yellow = yellow
exports.blue = blue
exports.magenta = magenta
exports.cyan = cyan
exports.white = white

function DALog(options) {
	var self = this
	options = options || {
		username: null,
		displayDebug: false
	}
	this.user_name = options.username || null
	this.displayDebug = options.displayDebug || false
	
	this.user = function(){
		if(self.user_name != null){
			return yellow + bright + self.user_name + Reset + " "
		}else{
			return ""
		}
	}
}

module.exports = DALog

DALog.prototype.updateLogFile = function(logDetails,debug){
	var self = this
	var d = new Date();
	var year = d.getYear()+1900
	var month = d.getMonth()+1
	var day = d.getDate()
	
	logDetails = (typeof logDetails != "string" && typeof logDetails != "number") ? JSON.stringify(logDetails, null, '\t') : logDetails

	var logFileName = self.user_name != null ? `log/${year}-${month}-${day}/${self.user_name}.log` : `log/${year}-${month}-${day}/default.log`
	var debugLogFileName = self.user_name != null ? `log/${year}-${month}-${day}/debug-${self.user_name}.log` : `log/${year}-${month}-${day}/debug.log`
	var whereToWrite = "default"
	
	if(fs.existsSync('log') == false){
		fs.mkdirSync('log')
	}
	if(fs.existsSync(`log/${year}-${month}-${day}`) == false){
		fs.mkdirSync(`log/${year}-${month}-${day}`)
	}
	if(debug != undefined && debug == true){
		whereToWrite = "debug"
		fs.existsSync(debugLogFileName) == false ? fs.writeFileSync(debugLogFileName,"") : ""
	}else{
		fs.existsSync(logFileName) == false ? fs.writeFileSync(logFileName,"") : ""
	}
	
	try {
		whereToWrite == "default" ? fs.appendFileSync(logFileName, '\n' + logDetails) : fs.appendFileSync(debugLogFileName, '\n' + logDetails)
	}
	catch(err){
		console.log("Update log fail with error: " + err)
	}
}

DALog.prototype.setUser = function(whatName){
	this.user_name = whatName
}

DALog.prototype.status = function(...text){
	var self = this
	text = processMessage(...text)
	console.log(timeStamp() + self.user() + green + "Status: " + Reset + text)
	self.updateLogFile(normalTime() + "Status: " + text)
}

DALog.prototype.trade =	function(...text){
	var self = this
	text = processMessage(...text)
	console.log(timeStamp() + self.user()  + magenta + "Trade: " + Reset + text)
	self.updateLogFile(normalTime() + "Trade: " + text)
}

DALog.prototype.alert =	function(...text){
	var self = this
	text = processMessage(...text)
	console.log(timeStamp() + self.user()  + yellow + "Alert: " + Reset + text)
	self.updateLogFile(normalTime() + "Alert: " + text)
}

DALog.prototype.confirm = function(...text){
	var self = this
	text = processMessage(...text)
	console.log(timeStamp() + self.user()  + cyan + "Confirmation: " + Reset + text)
	self.updateLogFile(normalTime() + "Confirmation: " + text)
}

DALog.prototype.error = function(...text){
	var self = this
	text = processMessage(...text)
	console.log(timeStamp() + self.user()  + red + "Error: " + Reset + text + Reset)
	self.updateLogFile(normalTime() + "Error: " + text)
}

DALog.prototype.item = function(text){
	var self = this
	if(color === undefined){
		return (green + bright + "(" + text + ")" + Reset)
	}else{
		return (color + bright + "(" + text + ")" + Reset)
	}
}

DALog.prototype.warn = function(...text){
	var self = this
	text = processMessage(...text)
	console.log(timeStamp() + self.user()  + yellow + bright + "Warn: " + red + bright + text + Reset)
	self.updateLogFile(normalTime() + "Warn: " + text)
}

DALog.prototype.debug = function(...text){
	var self = this
	text = processMessage(...text)
	if(self.displayDebug == true){
		console.log(timeStamp() + self.user() + yellow + bright + "<Debug>: "  + Reset + text.join(" ") + Reset)
	}
	self.updateLogFile(normalTime() + "<Debug>: " + text.join(" "), true)
}

DALog.prototype.time = function(){
	var { hour, minute, second, ms } = returnTime()
	
	var time = green + bright + "[" + cyan + hour + white + ":" + cyan + minute + white + ":" + cyan + second + green + "] " + Reset
	
	return time
}

function processMessage(...msg) {
	var _msg = msg
	return _msg = _msg.map(function(x){
		if(typeof x != "string" && typeof x != "number") return JSON.stringify(JSON.parse(circularJSON.stringify(x)), null, '\t')
		return x
	})
}

function returnTime(){
	var d = new Date()
	var hour = ("00" + d.getHours()).substr(-2)
	var minute = ("00" + d.getMinutes()).substr(-2)
	var second = ("00" + d.getSeconds()).substr(-2)
	var ms = ("00" + d.getMilliseconds()).substr(-3)
	return { hour, minute, second, ms }
}

function normalTime(){
	var { hour, minute, second, ms } = returnTime()

	var time =  "[" + [ hour, minute, second, ms].join(":") + "] "
	
	return time
}

function timeStamp(){
	var { hour, minute, second, ms } = returnTime()
	
	var time = green + bright + "[" + cyan + hour + white + ":" + cyan + minute + white + ":" + cyan + second + green + "] " + Reset
	
	return time
}