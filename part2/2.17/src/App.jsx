import contactService from './services/contactService'
import { useEffect, useState } from 'react'
import './index.css'

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

const Notification = ({message, type}) => {
  if (message.length === 0) return

  let statusType = "success"
  switch (type) {
    case 0:
      statusType = "success"
      break;
  
    case 1:
      statusType = "error"
    default:
      break;
  }
  
  return (
    <div className={statusType}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState(new RegExp(""))
  const [status, setStatus] = useState("")
  const [statusType, setStatusType] = useState(0)

  const handleOnSubmit = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName.trim(),
      number: newPhone.trim(),
      id: String(Number(persons.reduce((max, current) => max.id > current.id ? max.id : current.id, 0)) + 1)
    }


    const prompt = `${nameObject.name} is already added to the phonebook, do you want to replace the old phone number?`
    const duplicate = persons.find((person) => person.name.toLowerCase() === nameObject.name.toLowerCase())
    if (duplicate !== undefined && confirm(prompt)) {
        contactService
          .update(duplicate.id, nameObject)
          .then(data => {
            loadContacts()
            setStatusType(0)
            setStatus((`Contact '${nameObject.name}' was successfully changed!`))
            setTimeout(() => {
              setStatus((""))
            }, 5000)
          })

        
        setPersons(persons.map((person) => person.id === duplicate.id ? nameObject : person))
    }
    else {
      contactService
        .create(nameObject)
        .then(data => {
          loadContacts()
          setStatusType(0)
          setStatus((`Contact '${nameObject.name}' was successfully created!`))

          setTimeout(() => {
            setStatus((""))
          }, 5000)
        })
      setPersons(persons.concat(nameObject))
    }


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
    setFilter(new RegExp(event.target.value.toLowerCase().trim()))
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
      .then(() => loadContacts())
      .catch((error) => {
        if (error.status == 404) {
          setStatusType(1)
          setStatus(("The contact couldn't be deleted since it couldn't be found on the server"))
          setTimeout(() => setStatus(("")), 5000)
        }
      })
    
    setPersons(persons.filter(p => p.id !== person.id))
  }

  useEffect(loadContacts, [])
    
  
  
  const contactsToShow = persons.filter((person) => person.name.toLowerCase().match(filter))


  return (
    <div>
      <Notification message={status} type={statusType}/>
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