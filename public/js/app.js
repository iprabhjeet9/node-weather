console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne= document.querySelector('#message-1')
const msgSecond= document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    msgOne.textContent='Loading...'
    msgSecond.textContent=''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                msgOne.textContent=data.Error
            } else {
                msgOne.textContent='Temperature is : '+data.Temperature
                msgSecond.textContent='Description : '+data.Forcast
            }
        })
    })
})