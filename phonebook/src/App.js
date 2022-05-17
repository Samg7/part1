import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [alertMessage, setAlertMessage] = useState({error: null, success: null})

  // Fetch and render data from db.JSON
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  // Callback function that adds a new phone number object to persons
  const addPhoneNumber = (event) => {
    event.preventDefault()
    const phoneNumberObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,  // flesh out later -- filter numbers by name
    }

    // Validate phone number is not a duplicate object, else replace number
    let phoneNumberIsUnique = true
    persons.forEach(person => {
      if (JSON.stringify(person.name) === JSON.stringify(newName)) {
        phoneNumberIsUnique = false
        const targetID = person.id

        const changedNumber = {
          ...person,
          number: newNumber,
        }

        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          personService
            .update(targetID, changedNumber)
            .then(returnedPerson => {
              setPersons(
                persons.map(p => p.id !== targetID ? p : returnedPerson)
              )
            })
        }
      }
      setNewName('')
      setNewNumber('')
      return
    })
    
    // Assertion: Phonebook does not contain a duplicate of phoneNumberObject
    if (phoneNumberIsUnique) {
      personService
        .create(phoneNumberObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })

        // Update alert to represent a successful operation
        const successAlert = {
          ...alertMessage,
          success: `${phoneNumberObject.name} was added`
        }

        setAlertMessage(successAlert)
        
        setTimeout(() => {
          setAlertMessage({...alertMessage, success: null})
        }, 5000)
    }
  }

  // Remove a single person from the phonebook
  const removePhoneNumber = (id) => {
    const phoneNumber = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${phoneNumber.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(
            persons.filter(p => p.id !== phoneNumber.id)
          )
        })
        .catch(error => {
          // Update alert to represent an unsuccessful operation
          const errorAlert = {
            ...alertMessage,
            error: `Information of ${phoneNumber.name} has already been removed from server`
          }

          setAlertMessage(errorAlert)

          setTimeout(() => {
            setAlertMessage({...alertMessage, error: null})
          }, 5000)

          setPersons(persons.filter(p => p.id !== phoneNumber.id))
        })
    }
  }

  // Update form input text
  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }
  
  // Update phone number form input
  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  // Update filter form input
  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification 
        message={alertMessage.error || alertMessage.success}
        className={alertMessage.error ? "error" : (alertMessage.success ? "success" : null)}
      />

      <Filter newFilter={newFilter} handleFilterInputChange={handleFilterInputChange} />

      <h3>add a new</h3>

      <PersonForm 
        addPhoneNumber={addPhoneNumber}
        newName={newName} handleNameInputChange={handleNameInputChange}
        newNumber={newNumber} handleNumberInputChange={handleNumberInputChange}
      />

      <h3>Numbers</h3>

      <ul>
        <Persons filter={newFilter} persons={persons} handleRemoval={removePhoneNumber} />
      </ul>
    </div>
  )
}

export default App