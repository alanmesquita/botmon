var request = require('request');

function PokemonService(param) {
  this.url   = config.pokeapi.uri;
  this.param = param;
}

PokemonService.prototype.getRandon = function() {
  console.log(this.get("/pokemon/" + Math.floor(Math.random() * 150)));
}

PokemonService.prototype.get = function(param) {
  return request(
    {url: this.url + param},
    this.getCallback
  );
}

PokemonService.prototype.getCallback = function(error, response, body) {
  if(error || response.statusCode != 200) {
    console.log("code: " + response.statusCode);
    return false;
  }

  return JSON.parse(body);
}

module.exports = PokemonService;
