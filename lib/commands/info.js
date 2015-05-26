var util = require("util");
var events = require("events");

function Info(message, user) {
  events.EventEmitter.call(this);

  this.message = user.name + ' kill me pleaaaaase!!';
}

util.inherits(Info, events.EventEmitter);

Info.prototype.execute = function() {
  this.emit("complete", this.message)
}

module.exports = Info;
