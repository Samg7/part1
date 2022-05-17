const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => 
  <>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

// Sum all exercises of each part
const Total = ({ parts }) => {
  const initialValue = 0

  const sum = parts.reduce((prev, curr) => {
    console.log('what is happening', prev, curr)
    return prev + curr.exercises
  }, initialValue);

  return (
    <p><b>total of exercises {sum}</b></p> 
  )
}

const Course = ({course}) =>
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>

export default Course