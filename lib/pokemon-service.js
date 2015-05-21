var Request = require('request');

function PokemonService() {
  this.url   = config.pokeapi.uri;
  this.error = false;
}

PokemonService.prototype.getRandon = function() {
  this.get("/pokemon/" + Math.floor(Math.random() * 150) + 1);
}

PokemonService.prototype.get = function(param) {
  request(this.url + param, function(error, response, body) {
    if(error || response.statusCode != 200) {
      this.error = true;
      console.log("code: " + response.statusCode);
      console.log("body: " + body);
      return false;
    }

    return JSON.parse(body);
  }.bind(this));
}
