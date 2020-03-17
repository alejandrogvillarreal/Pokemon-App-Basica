const mongoose = require('mongoose')
const faker = require('faker');

const typesArray = ['Fuego', 'Agua', 'Planta', 'Electrico']

const pokemonModel = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: typesArray },
    level: Number,
    image: { type: String, default: '/public/images/pokeball.png' },
    atacks:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ataques' }],
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }],
    slug: String
}, { versionKey: false });

const Pokemon = mongoose.model('pokemons', pokemonModel)

Pokemon.find({}, (error, result) => {
    if (error) {
        console.log('Error para insertar los Pokemons Fake');
    }

    if (result.length <= 0) {
        for (let i = 0; i < 36; i++) {
            let name = faker.lorem.word();
            Pokemon.create({
                name: name,
                slug: name.toLowerCase().replace(/ /g, '-'),
                type: typesArray[Math.floor(Math.random() * typesArray.length)],
                level: faker.random.number(),
                image: `/public/images/pokemons/${i}.png`
            });
        }
    }
});

module.exports = Pokemon;