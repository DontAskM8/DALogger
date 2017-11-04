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

exports.status = function(text, color){
	if(color === undefined){
		console.log(timeStamp() + green + "Status: " + Reset + text)
	}else{
		console.log(timeStamp() + color + "Status: " + Reset + text)
	}
}

exports.trade =	function(text, color){
	if(color === undefined){
		console.log(timeStamp() + magenta + "Trade: " + Reset + text)
	}else{
		console.log(timeStamp() + color + "Trade: " + Reset + text)
	}
}

exports.alert =	function(text, color){
	if(color === undefined){
		console.log(timeStamp() + yellow + "Alert: " + Reset + text)
	}else{
		console.log(timeStamp() + color + "Alert: " + Reset + text)
	}
}

exports.confirm = function(text, color){
	if(color === undefined){
		console.log(timeStamp() + cyan + "Confirmation: " + Reset + text)
	}else{
		console.log(timeStamp() + color + "Confirmation: " + Reset + text)
	}
}

exports.error = function(text, color){
	if(color === undefined){
		console.log(timeStamp() + red + "Error: " + Reset + text + Reset)
	}else{
		console.log(timeStamp() + color + "Error: " + Reset + text)
	}
}

exports.item = function(text, color){
	if(color === undefined){
		console.log(timeStamp() + green + bright + "(" + text + ")" + Reset)
	}else{
		console.log(timeStamp() + color + bright + "(" + text + ")" + Reset)
	}
}

exports.warn = function(text, color1, color2){
	if(color1 === undefined || color2 === undefined){
		console.log(timeStamp() + yellow + bright +"Warn: " + red + bright + text + Reset)
	}else{
		console.log(timeStamp() + color1 + bright +"Warn: " + color2 + bright + text + Reset)
	}
}

function timeStamp(){
	d = new Date()
	var hour = ("00" + d.getHours()).substr(-2)
	var minute = ("00" + d.getMinutes()).substr(-2)
	var second = ("00" + d.getSeconds()).substr(-2)
	
	var time = green + bright + "[" + cyan + hour + white + ":" + cyan + minute + white + ":" + cyan + second + green + "] " + Reset
	
	return time
}

exports.time = function(){
	d = new Date()
	var hour = ("00" + d.getHours()).substr(-2)
	var minute = ("00" + d.getMinutes()).substr(-2)
	var second = ("00" + d.getSeconds()).substr(-2)
	
	var time = green + bright + "[" + cyan + hour + white + ":" + cyan + minute + white + ":" + cyan + second + green + "] " + Reset
	
	return time
}