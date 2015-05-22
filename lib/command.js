function Command(message, channel, user) {
  this.message       = message;
  this.channel       = channel;
  this.user          = user;
  this.commands      = config.commands;
  this.parsedCommand = this.parse();
}

Command.prototype.execute = function() {
  if(!this.isValid()) {
    this.channel.send('comando inválido');
    return;
  }

  var currentCommand = this.getCommand();

  currentCommand = new currentCommand(this.message, this.user);

  currentCommand.once('complete', function(message) {
    this.channel.send(message);
    //currentCommand.removeAllListeners();
  }.bind(this))

  currentCommand.execute();
}

Command.prototype.isValid = function() {
  return this.parsedCommand[0] in this.commands;
}

Command.prototype.parse = function() {
  return this.message.replace("botmon ", "").split(" ");
}

Command.prototype.getCommand = function() {
  return require("./commands/" + this.parsedCommand[0].toLowerCase() + ".js");
}

module.exports = Command;
