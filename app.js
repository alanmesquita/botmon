var SlackService = require('./lib/slack-service.js')
console.log(SlackService);
config = require("./config/config.json");

var slackService = new SlackService(config.slack.token);
slackService.run();
