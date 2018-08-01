const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 12

const participantsSchema = new Schema({
    Name : String,
    Email : String,
    Phone : String,
    Address: String,
    Batch : String,
    Username : String,
    Password : String

})
// participantsSchema.pre('save', (next) => {
//     this.Password = bcrypt.hashSync(this.Password, saltRounds)
//     next()
// })

let Participants = mongoose.model('Participants', participantsSchema)
module.exports.Participants=Participants