function Command(message) {
  this.message  = message;
  this.commands = config.commands;
  this.parsedCommand = this.parse();
}

Command.prototype.isValid = function() {
  return this.parsedCommand[0] in this.commands;
}

Command.prototype.parse = function() {
  return this.message.replace("botmon ", "").split(" ")
}

module.exports = Command;
