const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne= document.querySelector('#message-1')
const msgSecond= document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    msgOne.textContent='Loading...'
    msgSecond.textContent=''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                msgOne.textContent=data.Error
            } else {
                msgOne.textContent='Showing result for '+data.query
                msgSecond.textContent='Temperature is '+data.temperature+'°C, Feels like '+data.feelslike+'°C and\
                 it is '+data.description+'.'
            }
        })
    })
})