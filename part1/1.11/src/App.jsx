import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <div>
      {text} {value} {text == "positive" ? "%" : ""}
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad)/all
  const positive = all === 0 ? 0 : good/all*100

  if (all === 0) {
    return (
    <>
      No feedback given
    </>
    )
  }

  return (
  <div>
    <table>
      <tbody>
        <tr><td><StatisticLine text={"good"} value={good}/></td></tr>
        <tr><td><StatisticLine text={"neutral"} value={neutral}/></td></tr>
        <tr><td><StatisticLine text={"bad"} value={bad}/></td></tr>
        <tr><td><StatisticLine text={"average"} value={average}/></td></tr>
        <tr><td><StatisticLine text={"positive"} value={positive}/></td></tr>
      </tbody>
    </table>
  </div>
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
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App