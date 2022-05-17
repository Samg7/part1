const Notification = ({ message, className }) => {
  if (message === null || className === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification