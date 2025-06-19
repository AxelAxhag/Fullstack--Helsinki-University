const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = ({parts}) => {
  const list = parts.map(part => <p>{part[0]} {part[1]}</p>)

  return (
    <>
      {list} 
    </>
  )
}

const Total = (props) => {
  var tot_e = 0
  
  props.exercises.forEach(element => {
    tot_e += element
  });

  return (
    <p>Number of exercises {tot_e}</p>
  )
}

// Stores data
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course}/>
      <Content parts={[[part1, exercises1], [part2, exercises2], [part3, exercises3]]}/>
      <Total exercises={[exercises1, exercises2, exercises3]}/>
    </>
  )
}

export default App