function PokemonModel() {
  this.schema = this.getScheme();
  this.pokemon = mongoose.model("Pokemon", this.schema);
}

PokemonModel.prototype.getScheme = function() {
  return new mongoose.Schema({
    user_id:      Number,
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

PokemonModel.prototype.create = function(data) {
  this.pokemon.create(data, function(err, response) {
    if (err) {
      console.log(err);
      return false;
    }
    return true;
  })
}
