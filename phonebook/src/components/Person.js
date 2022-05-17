const Person = ({ phoneNumber, handleRemoval }) => (
  <li>
    {phoneNumber.name} {phoneNumber.number} <button onClick={() => handleRemoval(phoneNumber.id)}>delete</button>
  </li>
)

export default Person