require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')


const app = express()

morgan.token('body', request => JSON.stringify(request.body))

app.use(express.json())
app.use(morgan('tiny'))
app.use(morgan(':method :url :body'))
app.use(cors())
app.use(express.static('dist'))

app.get('/', (request, response) => {
    response.send('<h1>PhoneBook</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  
  if (person) {
  response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info' , (request, response) => {
  const date = new Date().toString()
  response.send(`<p>Phonebok has info for ${persons.length} people</p><p>${date}</p> `)

})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    response.json(person)
  })
})

const generateId = () => {
  const newId = Math.floor((Math.random() *(200 - 5) + 5))
  return String(newId)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'misssing data'
    })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}` )
})