function PokemonModel() {
  this.schema = this.getScheme();
  this.pokemon = this.setModel();
}

PokemonModel.prototype.getScheme = function() {
  return new mongoose.Schema({
    user_id:      String,
    name:         String,
    image:        String,
    attack:       Number,
    defense:      Number,
    exp:          Number,
    hp:           Number,
    national_id:  Number,
    sp_atk:       Number,
    sp_def:       Number,
    speed:        Number,
    types:        [],
    abilities:    [],
    evolutions:   [],
    moves:        [],
    custom_moves: []
  });
}

PokemonModel.prototype.create = function(data, callback) {
  this.pokemon.create(data, callback);
}

PokemonModel.prototype.findByUserId = function (id, callback) {
  this.pokemon.findOne({ user_id: id  }, callback);
}

PokemonModel.prototype.setModel = function() {
  try {
    return mongoose.model("Pokemon", this.schema)
  } catch(err) {
    return mongoose.model('Pokemon');
  }
}

module.exports = PokemonModel;
