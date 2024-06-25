const API_URL = "https://koders-list-api.vercel.app";

// function fetch
export function getKoders() {
    return fetch(`${API_URL}/koders`)
        .then(response => response.json())
        .then(data => data.koders)
}

// Funcion Async/Await
// export async function getKodersAsync() {
//     const response = await fetch(`${API_URL}/koders`)
//     const data = await response.json
//     return data.koders
// }

export function createKoder(koder){
    return fetch(`${API_URL}/koders`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            firstName: koder.firstName,
            lastName: koder.lastName,
            email: koder.email
        })
    })
}

export function deleteKoder(koderId){
    return fetch(`${API_URL}/koders/${koderId}/delete`, {
        method: 'POST'
    })
}