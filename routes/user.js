'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pokemon = require('../models/Pokemon');

const isAuthenticated = require('../middlewares/isAuthenticated');

router.post('/newPokemon/:pokemonId',isAuthenticated, function (req, res) {
    // USER IN REQ.USER
    User.findById({ _id: req.user.id }, (error, user) => {

        if (error) {
            res.send('No se pudo encontrar el user');
        }

        Pokemon.findById({ _id: req.params.pokemonId },(err, pokemon)=>{
            if (error) res.send('No se encontro el pokemon')

            User.update(
                { "_id": user._id },
                { "$push": { "pokemons": pokemon._id } },
                function(err, raw){
                    if (err) res.send('No se pudo crear el pokemon al user')
                    res.redirect(`/user/profile`)
                }
            )

        })
    });
})

router.get('/profile',isAuthenticated, function (req, res) {
    User
        .findOne({ username: req.user.username })
        .populate('pokemons')
        .exec(function (err, user) {
            res.render('user',{user:user});
        })
})

router.get('/', function (req, res) {
    res.redirect('/pokemons');
})


module.exports = router;