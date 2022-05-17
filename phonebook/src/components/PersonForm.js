import Input from "./Input"

const PersonForm = ({ addPhoneNumber, newName, handleNameInputChange, newNumber, handleNumberInputChange }) => {
  return (
    <>
      <form onSubmit={addPhoneNumber}>
        <Input text='name:' newValue={newName} handleInputChange={handleNameInputChange} />
        <Input text='number:' newValue={newNumber} handleInputChange={handleNumberInputChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm