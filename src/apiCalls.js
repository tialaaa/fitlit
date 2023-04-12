
function fetchData(type) {
    return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(res => res.json())
}

function postHydration(inputObject) {
    return fetch('http://localhost:3001/api/v1/hydration',
    {
        method: 'POST', 
        body: JSON.stringify(inputObject),
        headers: {
            "Content-Type": "application/JSON"
        }
    })
    .then(res => res.json());
}

export { fetchData, postHydration }