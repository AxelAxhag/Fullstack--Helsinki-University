import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Stats = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = good/all*100 

  return (
  <>
    <h1>statistics</h1>
    good {good}
    <br/>
    neutral {neutral}
    <br/>
    bad {bad}
    <br/>
    all {all}
    <br/>
    average {average}
    <br/>
    positive {positive} %
  </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good+1)} text={"Good"}></Button>
      <Button onClick={() => setNeutral(neutral+1)} text={"Neutral"}></Button>
      <Button onClick={() => setBad(bad+1)} text={"Bad"}></Button>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App