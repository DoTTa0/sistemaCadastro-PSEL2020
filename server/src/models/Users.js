const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String, 
        required: true, 
    },
    cpf: {
        type: String, 
        required: true,
        max:11
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
    file: {
        type:Object({
            name: String,
            size: Number,
            key: String,
        }),
        default:{
            name: 'default.png',
            size: 6298,
            key: 'default.png'
        }
    },
    typeUser:{
        type: Number,
        default: 1
    }
});
// Exportar o modelo
module.exports = mongoose.model('Users', UserSchema);