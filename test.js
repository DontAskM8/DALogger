const Dalogger = require('./index.js')

const log = new Dalogger({
	displayDebug: true
})

log.debug({test: "test"}, "test")



log.register({
	name: "account",
	color: log.color.red
})

log.account("oiasodas@gmail.com")