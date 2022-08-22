import { useState, useEffect, useRef } from 'react'
import './App.css'
import { getPeople, getCharacter, searchCharacter } from './api/people'

function App() {
  const [textSearch, setTextSearch] = useState('')
  const inputSearch = useRef(null)
  const [people, setPeople] = useState([])
  const [errorState, setErrorState] = useState({ hasError: false })
  const [currentCharacter, setCurrentCharacter] = useState(1)
  const [details, setDetails] = useState({})

  useEffect(() => {
    getPeople()
    .then((data) => setPeople(data.results))
    .catch(handleError)
  }, [])

  useEffect(() => {
    getCharacter(currentCharacter).then(setDetails).catch(handleError)
  },[currentCharacter])

  const handleError = (err) => {
    setErrorState({ hasError: true, message: err.message})
  }

  const showDetails = (character) => {
    const id = Number(character.url.split('/').slice(-2)[0])
    setCurrentCharacter(id)
  }

  const onChangeTextSearch = (event) => {
    event.preventDefault()
    const text = inputSearch.current.value
    setTextSearch(text)

  }

  const onSearchSubmit = (event) => {
    if(event.key !== 'Enter') return
    
    inputSearch.current.value = ''
    setDetails({})
    searchCharacter(textSearch).then((data) => setPeople(data.results)).catch(handleError)
  }

  return (
    <>
    <input 
    ref = {inputSearch} 
    onChange = {onChangeTextSearch}
    onKeyDown = {onSearchSubmit} 
    type = 'text' 
    placeholder = 'Busqueda'/>

     <ul>
     {errorState.hasError && <div>{errorState.message}</div>}
     {people.map((character) => (
        <li key = {character.name} onClick = {() => showDetails(character)}>
          {character.name} </li>
      ))}  
           
      </ul>
        {details && (
          <aside>
          <h1> {details.name}</h1>
            <ul>
              <li>NOMBRE: {details.name} </li>
              <li>WEIGHT: {details.weight} </li>
             
            </ul>
        </aside>
        )}
        
    </>
  );
}

export default App;
