var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

const User = require("../models/user");

/* GET users listing. */


router.post("/checkEmail", (req, res) => {
  User.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      res.json({
        result: false,
      });
    } else {
      res.json({
        result: true,
      });
    }
  });
});
router.post("/inscription", (req, res) => {
  if (
    !checkBody(req.body, [
      "nom",
      "prenom",
      "email",
      "pays",
      "ville",
      "codePostal",
      "motDePasse",
    ])
  ) {
    res.json({ result: false, error: "Veuillez remplir tous les champs" });
    return;
  }

  User.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      res.json({
        message: "Cette adresse-mail a déja été utilisée",
      });
    } else {
      const hash = bcrypt.hashSync(req.body.motDePasse, 10);

      const newUser = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        pays: req.body.pays,
        ville: req.body.ville,
        codePostal: req.body.codePostal,
        rue: req.body.rue,
        motDePasse: hash,
        token: uid2(32),
      });
      newUser.save().then((data) => {
        res.json({ result: true,data });
      });
    }
  });
});

router.post("/connexion", (req, res) => {
  if (!checkBody(req.body, ["email", "motDePasse"])) {
    res.json({ result: false, error: "Veuillez remplir tous les champs" });
    return;
  }
  User.findOne({ email: req.body.email }).then((data) => {
    if (
      data &&
      bcrypt.compareSync(req.body.motDePasse, data.motDePasse)) {
      res.json({ result: true, data });
    } else {
      res.json({
        result: false,
        error:
          "L'utilisateur n'a pas été trouvé ou mauvais mot de passe ",
      });
    }
  });
  
})
module.exports = router;
