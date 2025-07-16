const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send("<h1>Root page</h1>")
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  console.log(request)

  const name = request.body.name
  const number = request.body.number

  if (!(name && number))
    return response.status(400).json({error: "Missing crucial information (name or number)"})

  const contact = {
    id: generateId(),
    name: name,
    number: number
  }

  persons = persons.concat(contact)
  response.status(201).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const contact = persons.find((person) => person.id === id)

  if (contact) {
    response.json(contact)
  }
  else {
    response.status(404)
    response.send(`Not Found: Could not find an contact matching id: ${id}`)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
  const amount_contacts = persons.length
  const people_or_person = amount_contacts === 1 ? "person" : "people"
  const page = `<div>The phonebook contains ${amount_contacts} ${people_or_person}</div>
                <div>${new Date().toString()}</div>`
  
  response.send(page)
})

const generateId = () => {
  const range = 1000000
  return String(Math.ceil(Math.random() * range))
  //return String(persons.map((person) => Number(person.id)).reduce((curr_max, id) => id > curr_max ? id : curr_max, 0) + 1)
}

const PORT = 3001 
app.listen(PORT)
