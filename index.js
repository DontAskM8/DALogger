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


exports.status = function(text, color){
	if(color === undefined){
		console.log(green + "Status: " + Reset + text)
	}else{
		console.log(color + "Status: " + Reset + text)
	}
}

exports.trade =	function(text, color){
	if(color === undefined){
		console.log(magenta + "Trade: " + Reset + text)
	}else{
		console.log(color + "Trade: " + Reset + text)
	}
}

exports.alert =	function(text, color){
	if(color === undefined){
		console.log(yellow + "Alert: " + Reset + text)
	}else{
		console.log(color + "Alert: " + Reset + text)
	}
}

exports.confirm = function(text, color){
	if(color === undefined){
		console.log(cyan + "Confirmation: " + Reset + text)
	}else{
		console.log(color + "Confirmation: " + Reset + text)
	}
}

exports.error = function(text, color){
	if(color === undefined){
		console.log(red + "Error: " + Reset + text + Reset)
	}else{
		console.log(color + "Error: " + Reset + text)
	}
}

exports.item = function(text, color){
	if(color === undefined){
		console.log(green + bright + "(" + text + ")" + Reset)
	}else{
		console.log(color + bright + "(" + text + ")" + Reset)
	}
}

exports.warn = function(text, color1, color2){
	if(color1 === undefined || color2 === undefined){
		console.log(yellow + bright +"Warn: " + red + bright + text + Reset)
	}else{
		console.log(color1 + bright +"Warn: " + color2 + bright + text + Reset)
	}
}