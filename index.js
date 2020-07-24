const fs = require("fs")

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

function updateLogFile(logDetails){
	var d = new Date();
	var year = d.getYear()+1900
	var month = d.getMonth()+1
	var day = d.getDate()
	
	if(fs.existsSync('log') == false){
		fs.mkdirSync('log')
	}
	if(fs.existsSync(`log/${year}-${month}-${day}.log`) == false){
		fs.writeFileSync(`log/${year}-${month}-${day}.log`,"")
	}
	
	fs.appendFile(`log/${year}-${month}-${day}.log`, '\n' + logDetails, function(err){
		if(err)
			console.log("Update log fail with error: " + err.message)
	})
}

var user_name = ""
exports.setUser = function(whatName){
	user_name = whatName + " "
}

exports.status = function(text, color){
	if(color === undefined){
		console.log(timeStamp() + user() + green + "Status: " + Reset + text)
		updateLogFile(normalTime() + "Status: " + text)
	}else{
		console.log(timeStamp() + user()  + color + "Status: " + Reset + text)
		updateLogFile(normalTime() + "Status: " + text)
	}
}

exports.trade =	function(text, color){
	if(color === undefined){
		console.log(timeStamp() + user()  + magenta + "Trade: " + Reset + text)
		updateLogFile(normalTime() + "Trade: " + text)
	}else{
		console.log(timeStamp() + user()  + color + "Trade: " + Reset + text)
		updateLogFile(normalTime() + "Trade: " + text)
	}
}

exports.alert =	function(text, color){
	if(color === undefined){
		console.log(timeStamp() + user()  + yellow + "Alert: " + Reset + text)
		updateLogFile(normalTime() + "Alert: " + text)
	}else{
		console.log(timeStamp() + user()  + color + "Alert: " + Reset + text)
		updateLogFile(normalTime() + "Alert: " + text)
	}
}

exports.confirm = function(text, color){
	if(color === undefined){
		console.log(timeStamp() + user()  + cyan + "Confirmation: " + Reset + text)
		updateLogFile(normalTime() + "Confirmation: " + text)
	}else{
		console.log(timeStamp() + user()  + color + "Confirmation: " + Reset + text)
		updateLogFile(normalTime() + "Confirmation: " + text)
	}
}

exports.error = function(text, color){
	if(color === undefined){
		console.log(timeStamp() + user()  + red + "Error: " + Reset + text + Reset)
		updateLogFile(normalTime() + "Error: " + text)
	}else{
		console.log(timeStamp() + user()  + color + "Error: " + Reset + text)
		updateLogFile(normalTime() + "Error: " + text)
	}
}

exports.item = function(text, color){
	if(color === undefined){
		return (green + bright + "(" + text + ")" + Reset)
	}else{
		return (color + bright + "(" + text + ")" + Reset)
	}
}

exports.warn = function(text, color1, color2){
	if(color1 === undefined || color2 === undefined){
		console.log(timeStamp() + user()  + yellow + bright + "Warn: " + red + bright + text + Reset)
		updateLogFile(normalTime() + "Warn: " + text)
	}else{
		console.log(timeStamp() + user()  + color1 + bright + "Warn: " + color2 + bright + text + Reset)
		updateLogFile(normalTime() + "Warn: " + text)
	}
}

exports.time = function(){
	d = new Date()
	var hour = ("00" + d.getHours()).substr(-2)
	var minute = ("00" + d.getMinutes()).substr(-2)
	var second = ("00" + d.getSeconds()).substr(-2)
	
	var time = green + bright + "[" + cyan + hour + white + ":" + cyan + minute + white + ":" + cyan + second + green + "] " + Reset
	
	return time
}

function normalTime(){
	d = new Date()
	var hour = ("00" + d.getHours()).substr(-2)
	var minute = ("00" + d.getMinutes()).substr(-2)
	var second = ("00" + d.getSeconds()).substr(-2)
	
	var time =  "[" + hour + ":" + minute + ":" + second + "] "
	
	return time
}

function timeStamp(){
	d = new Date()
	var hour = ("00" + d.getHours()).substr(-2)
	var minute = ("00" + d.getMinutes()).substr(-2)
	var second = ("00" + d.getSeconds()).substr(-2)
	
	var time = green + bright + "[" + cyan + hour + white + ":" + cyan + minute + white + ":" + cyan + second + green + "] " + Reset
	
	return time
}

function user(){
	return yellow + bright + user_name + Reset
}