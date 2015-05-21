var Slack = require('slack-client');
var Command = require('./command.js')

function SlackService(token) {
  this.slack    = new Slack(token, true, true);
  this.channels = "";
  this.groups   = "";

  this.triggerOpen();
  this.triggerMessage();
  this.triggerError();
}

SlackService.prototype.triggerError = function() {
  this.slack.on("error", function(message) {
    console.log(message);
  });
}

SlackService.prototype.triggerOpen = function() {
  this.slack.on("open", function() {
    this.setChannels();
    this.setGroups();
    console.log('CONECTADO!!');
  }.bind(this));
}

SlackService.prototype.setChannels = function() {
  this.channels = Object.keys(this.slack.channels)
    .map(function (k) { return this.slack.channels[k]; }.bind(this))
    .filter(function (c) { return c.is_member; }.bind(this))
    .map(function (c) { return c.name; }.bind(this));
}

SlackService.prototype.setGroups = function() {
  this.groups = Object.keys(this.slack.groups)
    .map(function (k) { return this.slack.groups[k]; }.bind(this))
    .filter(function (g) { return g.is_open && !g.is_archived; }.bind(this))
    .map(function (g) { return g.name; }.bind(this));
}


SlackService.prototype.triggerMessage = function() {
  this.slack.on('message', function(message) {
    var channel = this.slack.getChannelGroupOrDMByID(message.channel);
    var user = this.slack.getUserByID(message.user);

    if (message.type === 'message' && message.text.match(/^botmon /g) != null) {
      var command = new Command(message.text, channel, user);
      command.execute();
    }
  }.bind(this));
}

SlackService.prototype.run = function() {
  this.slack.login();
}

module.exports = SlackService;
