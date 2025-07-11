import { useState, useEffect } from "react"
import loadCountryData from "./services/countryAPI"
import "./index.css"

const SearchBar = ({search, onChangeSearch}) => {
  return (
    <input type="text" value={search} onChange={onChangeSearch}/>
  )
} 

const CountryList = ({countries}) => {
  const max_country_amount = 10
  const message = <>Too many countries listed, specify search further.<br/> Max. amount of countries = {max_country_amount}</>
  if (countries.length > max_country_amount) return message
  if (countries.length == 1) return <SingleCountryInfo country={countries[0]}/>

  return(
    <>
      Amount of countries: {countries.length}
        <ul>
          {countries.map((country) => <li key={country.cca2}>{country.name.common}</li>)}
        </ul>
    </>
  )
}

const SingleCountryInfo = ({country}) => {
  const country_name = country.name.common
  const flag = country.flag
  const capital = country.capital[0]
  const population = Number(country.population).toLocaleString()
  const currency = Object.values(country.currencies)[0].name
  const currency_symbol = Object.values(country.currencies)[0].symbol
  const languages = Object.values(country.languages).reduce((langs, lang, index) => Object.values(country.languages).length === index + 1 ? `${langs}${lang}` : `${langs}${lang}, `, "")

  return (
    <>
      <h4>{country_name} <img src={country.flags.svg} width={15} className="flag"/></h4>
      🏙️ {capital} <br/>
      🧑 {population} <br/>
      💵 {currency} ({currency_symbol}) <br/>
      💬 {languages}            
    </>
  )
}

const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])

  const onChangeSearch = (event) => {
    setSearch(event.target.value)
  }

  const setupData = () => {
    loadCountryData()
      .then((data) => setCountries(data))
  }

  useEffect(setupData, [])
  const regex = new RegExp(search.toLowerCase())
  const country_query = countries.filter((country) => country.name.common.toLowerCase().match(regex))

  return (
    <>
      <h3>Search</h3>
      Find countries: 
      <SearchBar 
      search={search} 
      onChangeSearch={onChangeSearch}
      />

      <h3>Countries</h3>
      <CountryList 
      countries={country_query}
      />
    </>
  )
}


export default App