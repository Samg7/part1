const Input = ({ text, newValue, handleInputChange }) => {
  return (
    <div>
      {text} <input value={newValue} onChange={handleInputChange} />
    </div>
  )
}

export default Input