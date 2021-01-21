const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const displaydiv = document.getElementById("display");
const OMDbAPIbase = "http://www.omdbapi.com/?apikey=bb9280f"

let Movielist;
let OMDbAPI;

function changeAPi(input) {
    OMDbAPI = OMDbAPIbase+"&s="+input
}

function printPoster(i) {
    document.querySelector(`#image${i}`).src = Movielist.Search[i].Poster
}

function printTitle(i) {
    document.querySelector(`#title${i}`).innerHTML = Movielist.Search[i].Title
}

function printDate(i) {
    document.querySelector(`#date${i}`).innerHTML = Movielist.Search[i].Year
}

function newDisplay(i){
    displaydiv.innerHTML+=`
    <div class="card" style="width: 25%;">
        <img id="image${i}">
        <div class="card-body">
            <h5 id="title${i}" class="card-title"></h5>
            <p id="date${i}" class="card-text"></p>
        </div>
    </div>`
    printPoster(i);
    printTitle(i);
    printDate(i);
}

function getMovielist(OMDbAPI) {
    displaydiv.innerHTML=""

    fetch(OMDbAPI, {
        method: "GET"
    })

    .then((response) => response.json())
    .then((item) => {
        Movielist = item
        console.log(Movielist)

        for(let i=0;i < 10; i++){
            newDisplay(i);
        };
    })
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const inputValue = searchInput.value;
    console.log(inputValue);
    changeAPi(inputValue);
    getMovielist(OMDbAPI);
});

