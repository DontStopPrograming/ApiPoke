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
  const [page, setPage] = useState(1)

  useEffect(() => {
    getPeople()
    .then(setPeople)
    .catch(handleError)
  }, [page])

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
    searchCharacter(textSearch)
      .then(setPeople)
      .catch(handleError)
  }

  const onChangePage = (next) => {
    if(!people.previous && page + next <= 0) return
    if(!people.next && page + next >= 9) return
    setPage(page + next)
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
     {errorState.hasError && <div>{errorState.message} </div>}
     {people?.results?.map((character) => (
        
        <li key = {character.name} onClick = {() => showDetails(character)}>
          {character.name} </li>
      ))}  
           
      </ul>

        <section>
          <button onClick = {()=> onChangePage(-1)}> Prev</button>| {page} |
          <button onClick = {()=> onChangePage(1)}> Next</button>
        </section>

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
