import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleOnSubmit = (event) => {
    event.preventDefault()
    

    const nameObject = {
      name: newName
    }

    setPersons(persons.concat(nameObject))
    setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App