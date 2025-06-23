const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = ({parts}) => {
  //const content = parts.map(part => <Part part={part[0]} exercise={part[1]}/>)

  return (
    <>
      <Part part={parts[0]['name']} exercise={parts[0]['exercises']}/>
      <Part part={parts[1]['name']} exercise={parts[1]['exercises']}/>
      <Part part={parts[2]['name']} exercise={parts[2]['exercises']}/>
    </>
  )
}

const Part = ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Total = (props) => {
  var tot_e = 0
  
  props.parts.forEach(element => {
    tot_e += element['exercises']
  });

  return (
    <p>Number of exercises {tot_e}</p>
  )
}

// Stores data
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </>
  )
}

export default App