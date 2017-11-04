const da = require('./index.js')

console.log(da.time())

setTimeout(function(){
	console.log(da.time())
},3000)