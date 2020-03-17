'use strict';

const express = require('express');
const router = express.Router();

const Pokemon = require('../models/Pokemon');
const Ataque = require('../models/Ataque');
const Comment = require('../models/Comment');

const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/', function (req, res, next) {
    Pokemon.find({}, (error, pokemons) => {
        if (error) {
            res.send('Error busando todos los pokemons');
        }
        res.render('pokemons', { pokemons: pokemons })
    })
});

router.get('/add', isAuthenticated, function (req, res, next) {

    Ataque.find({}, (error, ataques) => {
        if (error) {
            res.send('Error busando todos los ataques');
        }
        res.render('addPokemon', { ataques: ataques })
    })
});


router.post('/add', isAuthenticated, function (req, res, next) {

    const atacks = req.body.ataques || [];
    const pokemon = {
        name: req.body.name,
        slug: req.body.name.toLowerCase().replace(/ /g, '-'),
        type: req.body.type,
        level: req.body.level,
        atacks: atacks
    }
    Boolean(req.body.image.trim()) && (pokemon.image = req.body.image)

    Pokemon.create(pokemon, (error, pokemon) => {
        if (error) {
            res.send('No se pudo guardar el pokemon');
        }

        res.redirect('/pokemons');

    });
});

router.get('/edit/:id', isAuthenticated, function (req, res, next) {

    Pokemon.findOne({ _id: req.params.id }, (error, pokemon) => {
        if (error) {
            res.send('Error el pokemons');
        }
        res.render('edit', { pokemon: pokemon })
    })
});

router.post('/edit/:id', isAuthenticated, function (req, res, next) {
    req.body.slug = req.body.name.toLowerCase().replace(/ /g, '-');

    Pokemon.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, (error, result) => {
        if (error) {
            res.send('No se pudo editar el producto');
        }
        res.redirect('/pokemons');
    });
});

router.post('/delete/:id', isAuthenticated, function (req, res, next) {
    Pokemon.deleteOne({ _id: req.params.id }, (error, result) => {
        if (error) {
            res.send('No se pudo borrar el producto');
        }
        res.redirect('/pokemons');
    });
});

router.post('/comments/:id', isAuthenticated, function (req, res, next) {

    Pokemon.findById({ _id: req.params.id }, (error, pokemon) => {

        if (error) {
            res.send('No se pudo encontrar el pokemon');
        }

        const newComment = {
            content: req.body.content,
        };

        Comment.create(newComment, (error, comment) => {
            if (error) res.send('No se pudo crear el comentario')

            Pokemon.update(
                { "_id": pokemon._id },
                { "$push": { "comments": comment._id } },
                function (err, raw) {
                    if (err) res.send('No se pudo crear el comentario al pokemon')
                    res.redirect(`/pokemons/${pokemon._id}/${pokemon.slug}`)
                }
            );
        })
    });
});

router.get('/:id/:slug', function (req, res, next) {

    Pokemon
        .findOne({ _id: req.params.id })
        .populate('atacks')
        .populate('comments')
        .exec(function (err, pokemon) {
            res.render('pokemon', { pokemon: pokemon })
        })
});

module.exports = router;