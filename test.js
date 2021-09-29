const Dalogger = require('./index.js')

const log = new Dalogger({
	displayDebug: true
})

log.debug({test: "test"}, "test")