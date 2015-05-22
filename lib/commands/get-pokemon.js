var request = require('request');
var util = require("util");
var events = require("events");

function GetPokemon(message, user) {
  events.EventEmitter.call(this);

  this.message = 'Alguma coisa deu ruim!!';
  this.user = user;
  this.pokemon = {};
}

util.inherits(GetPokemon, events.EventEmitter);

GetPokemon.prototype.get = function() {
  request(config.pokeapi.uri + '/pokemon/' + Math.floor(Math.random() * 150),
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          this.configurePokemon(JSON.parse(body));
        } else {
          console.log('deu ruim');
          this.message = 'deu muito ruim!!';
        }

        this.emit("complete", this.message)
      }.bind(this)
    )
}

GetPokemon.prototype.execute = function() {
  this.get();
}

GetPokemon.prototype.configurePokemon = function(pokemon) {
  if (this.user.name == 'ale') {
    this.message = "Seu pokemon é o PHP, o melhor pokemon de todos os tempos!!!! http://thedeveloperworldisyours.com/wp-content/uploads/php.png";
  }else {
    this.message = "Seu pokemon é o "+pokemon.name+" http://pokeapi.co/media/img/"+pokemon.national_id+".png";
  }
}

module.exports = GetPokemon;
