const Header = (props) => {
  return (
    <h1>{props.course['name']}</h1>
  )
}

const Content = ({course}) => {
  //const content = parts.map(part => <Part part={part[0]} exercise={part[1]}/>)

  return (
    <>
      <Part part={course['parts'][0]['name']} exercise={course['parts'][0]['exercises']}/>
      <Part part={course['parts'][1]['name']} exercise={course['parts'][1]['exercises']}/>
      <Part part={course['parts'][2]['name']} exercise={course['parts'][2]['exercises']}/>
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
  
  props.course['parts'].forEach(element => {
    tot_e += element['exercises']
  });

  return (
    <p>Number of exercises {tot_e}</p>
  )
}

// Stores data
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </>
  )
}

export default App