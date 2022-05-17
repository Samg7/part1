import Input from "./Input"

const Filter = ({ newFilter, handleFilterInputChange }) => {
  return (
    <>
      <Input text='filter shown with' newValue={newFilter} handleInputChange={handleFilterInputChange} />
    </>
  )
}

export default Filter