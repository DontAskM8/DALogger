const fs = require('node:fs/promises');
const path = require("path");
const circularJSON = require('circular-json')

const Color = require("./colors.js");

function DALog(options) {
	var self = this
	options = options || {
		username: null,
		displayDebug: false
	}
	this.user_name = options.username || null
	this.displayDebug = options.displayDebug || false
	
	this.user = function(){
		if(self.user_name != null) {
			return Color.yellow + bright + self.user_name + Reset + " "
		}
		else {
			return ""
		}
	}

	this.color = Color;

	this.register({
		name: "Status", 
		color: Color.green,
	})
	
	this.register({
		name: "Trade", 
		color: Color.magenta
	})

	this.register({
		name: "Confirmation", 
		color: Color.cyan
	})

	this.register({
		name: "Alert", 
		color: Color.yellow
	})

	this.register({
		name: "Confirmation", 
		color: Color.yellow
	})

	this.register({
		name: "Error", 
		color: Color.red
	})

	this.register({
		name: "Confirmation", 
		color: Color.yellow
	})
	

}

module.exports = DALog

DALog.prototype.setUser = function(whatName){
	this.user_name = whatName
}

DALog.prototype.register = function({
	name, 
	color = Color.white,
	includeTime = true,
	removeCircularJSON = false,
	writeLog = true
}){
	const self = this;

	//Create new log levels
	Object.assign(DALog.prototype, {
		[name]: function(...text){
			if(removeCircularJSON) text = processMessage(...text)

			console.log((includeTime ? timeStamp() : "") + self.user() + color + name + ": " + Color.Reset + text);

			if(writeLog) self.updateLogFile(normalTime() + name + ": " + text)
		}
	})
}


DALog.prototype.updateLogFile = async function writeToFile(data, debug) {
	var self = this
	var d = new Date();
	var year = d.getFullYear()
	var month = d.getMonth()+1
	var day = d.getDate()
	
	data = (typeof data != "string" && typeof data != "number") ? JSON.stringify(data, null, '\t') : data

	var fileName = (self.user_name ? (self.user_name + "-") : "") + (debug ? "debug" : (self.user_name ? "" : "default")) + ".log"
	var filePath = `log/${year}-${month}-${day}/`
	var fullPath = path.join(filePath, fileName);

	try {
		await fs.appendFile(fullPath, data);
	}
	catch (err) {
		if (err.code === 'ENOENT') {
			
			// Create the directory and then write the file
			await fs.mkdir(filePath, { recursive: true });
	  
			// Retry writing to the file
			await fs.appendFile(fullPath, data);
		} 
		else {
			// Handle any other errors
			console.error('An unexpected error occurred:', err);
		}
	}
}

DALog.prototype.item = function(text){
	var self = this
	if(color === undefined){
		return (Color.green + Color.bright + "(" + text + ")" + Color.Reset)
	}else{
		return (color + Color.bright + "(" + text + ")" + Color.Reset)
	}
}

DALog.prototype.warn = function(...text){
	var self = this
	text = processMessage(...text)
	console.log(timeStamp() + self.user()  + Color.yellow + Color.bright + "Warn: " + Color.red + Color.bright + text + Color.Reset)
	self.updateLogFile(normalTime() + "Warn: " + text)
}

DALog.prototype.debug = function(...text){
	var self = this
	text = processMessage(...text)
	if(self.displayDebug == true){
		console.log(timeStamp() + self.user() + Color.yellow + Color.bright + "<Debug>: "  + Color.Reset + text.join(" ") + Color.Reset)
	}
	self.updateLogFile(normalTime() + "<Debug>: " + text.join(" "), true)
}

DALog.prototype.time = function(){
	var { hour, minute, second, ms } = returnTime()
	
	var time = Color.green + Color.bright + "[" + Color.cyan + hour + Color.white + ":" + Color.cyan + minute + Color.white + ":" + Color.cyan + second + Color.green + "] " + Color.Reset
	
	return time
}

function processMessage(...msg) {
	return msg.map((x) => {
		if(typeof x === "string" || typeof x === "number" || typeof x !== "object") return x
		return JSON.stringify(JSON.parse(circularJSON.stringify(x)), null, '\t')
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
	
	var time = Color.green + Color.bright + "[" + Color.cyan + hour + Color.white + ":" + Color.cyan + minute + Color.white + ":" + Color.cyan + second + Color.green + ":" + Color.cyan + ms + Color.green + "] " + Color.Reset
	
	return time
}