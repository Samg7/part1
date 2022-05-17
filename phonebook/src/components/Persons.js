import Person from "./Person"

const Persons = ({ filter, persons, handleRemoval }) => {
  const filteredPhoneBook = (filter.length === 0) 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      {filteredPhoneBook.map(phoneNumber =>
        <Person key={phoneNumber.id} phoneNumber={phoneNumber} handleRemoval={handleRemoval} />
      )}
    </>
  )
}

export default Persons