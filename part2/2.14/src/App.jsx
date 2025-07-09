import axios from 'axios'
import contactService from './services/contactService'
import { useEffect, useState } from 'react'

const Persons = ({persons, onDelete}) => {
  return(
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <li key={person.id}>{person.name} {person.number} <DeleteButton person={person} onDelete={onDelete}/></li>)} 
      </ul>
    </>
  )
}

const AddContact = ({onSubmit, newName, newPhone, nameOnChange, phoneOnChange}) => {
  return (
    <>
    <h2>Add contact</h2>
      <form onSubmit={onSubmit}>
        <div> name: <input value={newName} onChange={nameOnChange}/></div>
        <div> number: <input value={newPhone} onChange={phoneOnChange}/></div>

        <div><button type="submit">add</button></div>
      </form>
    </>
  )
}

const Search = ({onChange}) => {
  

  return (
    <>
      <h2>Phonebook</h2>
      Search <input onChange={onChange}/>
    </>
  )
}

const DeleteButton = ({person, onDelete}) => {
  return (
    <button onClick={() => onDelete(person)}>Delete</button>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "070-1231341", id: -1} 
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState(new RegExp(""))

  const handleOnSubmit = (event) => {
    event.preventDefault()
    
    if (persons.find((person) => person.name === newName) !== undefined) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const nameObject = {
      name: newName,
      number: newPhone,
      id: String(Number(persons.reduce((max, current) => max.id > current.id ? max.id : current.id, 0)) + 1)
    }

    contactService
      .create(nameObject)
      .then(data => setPersons(persons.concat(data)))
    
    setPersons(persons.concat(nameObject))

    setNewName("")
    setNewPhone("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
    console.log(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(new RegExp(event.target.value.toLowerCase()))
  }

  const loadContacts = () => {
    contactService
      .getAll()
      .then(data => setPersons(data)) 
  }

  const onDelete = (person) => {
    if (!confirm(`Are you sure you want to delete ${person.name}`)) return

    contactService
      .deleteContact(person.id)
    
    setPersons(persons.filter(p => p.id !== person.id))
  }

  useEffect(loadContacts, [])
    
  

  const contactsToShow = persons.filter((person) => person.name.toLowerCase().match(filter))


  return (
    <div>
      <Search onChange={handleFilterChange}/>
      <AddContact 
      onSubmit={handleOnSubmit} 
      newName={newName} 
      newPhone={newPhone} 
      nameOnChange={handleNameChange} 
      phoneOnChange={handlePhoneChange}
      />  
      <Persons persons={contactsToShow} onDelete={onDelete}/>
    </div>
  )
}

export default App