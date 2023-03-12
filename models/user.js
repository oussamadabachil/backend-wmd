const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nom: String,
  prenom: String,
  adresse_mail: String,
  pays: String,
  ville: String,
  codePostal: String,
  rue: String,
  motDePasse: String,
  token: String,
  email: String,
  likedFood: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food",
    },
  ],
  likedSnack: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "snack",
    },
  ],
  nbrCreditCard: String,
  twoDate: String,
  crypto: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
