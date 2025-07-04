import { useState } from 'react'

const Persons = ({persons}) => {
  return(
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <li key={person.name}>{person.name} {person.phone}</li>)}
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
      <Search onChange={handleFilterChange}/>
      <AddContact 
      onSubmit={handleOnSubmit} 
      newName={newName} 
      newPhone={newPhone} 
      nameOnChange={handleNameChange} 
      phoneOnChange={handlePhoneChange}
      />  
      <Persons persons={contactsToShow}/>
    </div>
  )
}

export default App