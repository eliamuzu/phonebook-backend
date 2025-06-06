const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to ', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/* const person = new Person({
  name: 'Arto Hellas',
  number: '444-222',
})

person.save().then(result => {
  console.log('person added!')
  mongoose.connection.close()
}) */

module.exports = mongoose.model('Person', personSchema)

