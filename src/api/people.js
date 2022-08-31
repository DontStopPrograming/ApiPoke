export async function getPeople() {
  try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`)
    if(!response.ok){
        return (response.status)
    }
    const data = await response.json()
    return data
  } catch(err){
    throw err
  }
}



export async function getCharacter(id = 1){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await response.json()
    return data
    
}

export async function searchCharacter(name){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    const data = await response.json()
    return data
}

class NetworkError extends Error {
    constructor() {
        super('Network error')
    }
}