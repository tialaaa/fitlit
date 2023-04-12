
function fetchData(type) {
    return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(res => res.json())
}

export { fetchData }