
// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then( (data) => {
//         console.log(data);
//     })
// })

fetch('http://localhost:3000/weather?address=mandya').then( (response) => {
    response.json().then( (data) => {
        console.log(data);
    })
})


const formSubmit = document.querySelector('form');
const locationVal = document.querySelector('input');

formSubmit.addEventListener('submit', (e) =>{
    e.preventDefault();
    fetch('http://localhost:3000/weather?address='+locationVal.value).then( (response) => {
    response.json().then( (data) => {
        console.log(data);
        document.querySelector('.weather-report').innerHTML = data[0].forecast;
    })
})
})