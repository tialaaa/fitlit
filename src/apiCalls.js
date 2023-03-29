
function fetchData(type) {
    return fetch(`https://fitlit-api.herokuapp.com/api/v1/${type}`)
    .then(res => res.json())
}

export { fetchData }