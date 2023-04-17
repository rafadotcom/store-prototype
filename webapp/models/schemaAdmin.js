const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // esquema do usuário
});

// verifica se o modelo User já foi registrado
const User = mongoose.models.User
  ? mongoose.model('User')
  : mongoose.model('User', userSchema);

module.exports = User;
