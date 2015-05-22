var SlackService = require('./lib/slack-service.js')

mongoose = require('mongoose');

config = require("./config/config.json");
root   = __dirname;

mongoose.connect(config.db.host);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var slackService = new SlackService(config.slack.token);
slackService.run();
