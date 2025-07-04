import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: "070-1231341"}
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
      phone: newPhone
    }

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

  const contactsToShow = persons.filter((person) => person.name.toLowerCase().match(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      Search <input onChange={handleFilterChange}/>

      <h2>Add contact</h2>
      <form onSubmit={handleOnSubmit}>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
        <div> number: <input value={newPhone} onChange={handlePhoneChange}/></div>

        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {contactsToShow.map((person) => <li key={person.name}>{person.name} {person.phone}</li>)}
      </ul>
    </div>
  )
}

export default App