export async function retrieveGames () {
  try {
    // send AJAX request to endpoint
    const response = await fetch('data/bggGames') // <-- returns a Promise
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    // throw new Error('Error')
    return await response.json()
  } catch (err) {
    console.error('Failed to retrieve array of movies')
    console.error(err)
    return []
  }
}

export async function retrieveGameDetails (gameId) {
  try {
    // send AJAX request to endpoint
    const response = await fetch(`data/bggGames/${gameId}`) // <-- returns a Promise
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    // throw new Error('Error')
    return await response.json()
  } catch (err) {
    console.error('Failed to retrieve details')
    console.error(err)
    return null
  }
}

export async function deleteGame (gameId) {
  try {
    const response = await fetch(`data/bggGames/${gameId}`, {
      method: 'DELETE'
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    // throw new Error('Error')
    return await response.json()
  } catch (err) {
    console.error('Failed to delete game')
    console.error(err)
    return null
  }
}

export async function addGame (obj) {
  try {
    const response = await fetch('data/add', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(obj)
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    // throw new Error('Error')
    return await response.json()
  } catch (err) {
    console.error('Failed to add game')
    console.error(err)
    return null
  }
}
