var SlackService = require('./lib/slack-service.js')

config = require("./config/config.json");

var slackService = new SlackService(config.slack.token);
slackService.run();
