const mongoose = require('mongoose')

const ataqueModel = new mongoose.Schema({
    name: { type: String, required: true },
    daño: Number
}, { versionKey: false });

const Ataque = mongoose.model('ataques', ataqueModel)

Ataque.find({}, (error, result) => {
    if (error) {
        console.log('Error para insertar los Ataques Fake');
    }

    if (result.length < 10) {
        Ataque.create({
            name: 'Trueno',
            daño: 41,
        });
    
        Ataque.create({
            name: 'Ventisca',
            daño: 38,
        });
    
        Ataque.create({
            name: 'Hidro Bomba',
            daño: 47,
        });
    
        Ataque.create({
            name: 'Meteorobola',
            daño: 36,
        });
    
        Ataque.create({
            name: 'Rayo Solar',
            daño: 40,
        });
    
        Ataque.create({
            name: 'Picadura',
            daño: 60,
        });
    
        Ataque.create({
            name: 'Patada Baja',
            daño: 20,
        });
    
        Ataque.create({
            name: 'Picotazo',
            daño: 50,
        });
    
        Ataque.create({
            name: 'Avalancha',
            daño: 25,
        });
    
        Ataque.create({
            name: 'Aletazo',
            daño: 100,
        });
    }
});



module.exports = Ataque;