var request = require('request');
var util = require("util");
var events = require("events");
var pokemonModel = require(root + "/lib/model/pokemon-model.js");
var shuffle = require('shuffle-array');

function GetPokemon(message, user) {
  events.EventEmitter.call(this);

  this.message = 'Pau nessa merda de js.';
  this.user = user;
  this.pokemon = {};
  this.randomNumber = shuffle(config.botmon.allowed)[0];
  this.apiUrl = config.pokeapi.uri;
  this.pokemonModel = new pokemonModel();
}

util.inherits(GetPokemon, events.EventEmitter);

GetPokemon.prototype.get = function() {
  console.log(this.randomNumber);
  request(this.apiUrl+ '/pokemon/' + this.randomNumber, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      this.save(this.configurePokemon(JSON.parse(body)));
    } else {
      this.message = 'Deu erro no api';
      this.emit("error", this.message);
    }
  }.bind(this))
}

GetPokemon.prototype.execute = function() {
  this.pokemonModel.findByUserId(this.user.id, function(err, response) {
    if(response != null) {
      this.message = 'Você já tem um pokemon seu safado! Para fazer a troca deposite' +
                     'um valor de: R$5,00 na conta do alanuhu\nSeu pokemon é o '+
                     response.name+' '+response.image;
      this.emit("error", this.message);
      return;
    }
    this.get();
  }.bind(this));
}

GetPokemon.prototype.configurePokemon = function(pokemon) {
  return {
    user_id:      this.user.id,
    name:         pokemon.name,
    image:        "http://pokeapi.co/media/img/"+pokemon.national_id+".png",
    attack:       pokemon.attack,
    defense:      pokemon.defense,
    exp:          pokemon.exp,
    hp:           pokemon.hp,
    national_id:  pokemon.national_id,
    sp_atk:       pokemon.sp_atk,
    sp_def:       pokemon.sp_def,
    speed:        pokemon.speed,
    types:        pokemon.types,
    abilities:    pokemon.abilities,
    evolutions:   pokemon.evolutions,
    moves:        pokemon.moves,
    custom_moves: this.getInitialMoves(pokemon.moves)
  };
}

GetPokemon.prototype.getInitialMoves = function(moves) {
  return moves.filter(function(i) {
    return i.level === 1;
  });
}

GetPokemon.prototype.save = function(pokemon) {
  this.pokemonModel.create(pokemon, function(err, response) {
    if (err) {
      this.message = "nao salvou";
      this.emit("error", this.message);
    }
    this.message = "Seu pokemon é o "+pokemon.name+" "+ pokemon.image +
                   " Com o(s) ataque(s): " +
                    pokemon.custom_moves.reduce(function(p, c) { return p.concat(c.name); }, []).join(', ');
    this.emit("complete", this.message);
  }.bind(this));
}

module.exports = GetPokemon;
