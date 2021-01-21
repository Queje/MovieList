const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const displaydiv = document.getElementById("display");
const OMDbAPIbase = "https://www.omdbapi.com/?apikey=bb9280f"

let Movielist;
let OMDbAPI;
let modal;
let btn;
let span;
let modalcontent;
let databyID;

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
    <div data-aos="fade-down-right" class="card" style="width: 25%;">
        <img id="image${i}">
        <div class="card-body">
            <h5 id="title${i}" class="card-title"></h5>
            <p id="date${i}" class="card-text"></p>
            <button onclick="popup(${i})" id="More-button${i}" class="btn btn-outline-primary my-2 my-sm-0" type="submit">Read More</button>
        </div>
    </div>
    <br>`
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

// open and display the popup than close the popup
function popup(i) {
    modal = document.getElementById("myModal");
    modal.style.display = "block";

    modalcontent = document.getElementById("modalcontent")
    modalcontent.innerHTML=`
        <img id="imagepop${i}">
        <div id="pop${i}" class="card-body">
            <h5 id="titlepop${i}" class="card-title"></h5>
            <p id="datepop${i}" class="card-text"></p>
            <br>
            <h6>short plot:</h6>
            <p id="plot${i}"></p>
            <br>
            <h6>Actors:</h6>
            <p id="actors${i}"></p>
        </div>`;
    document.getElementById(`imagepop${i}`).src = Movielist.Search[i].Poster
    document.getElementById(`pop${i}`).style.color = "black" 

    const titlepopup = document.getElementById(`titlepop${i}`)
    titlepopup.innerHTML = Movielist.Search[i].Title
    const datepopup = document.getElementById(`datepop${i}`)
    datepopup.innerHTML = Movielist.Search[i].Year

    let OMDbAPIID = "https://www.omdbapi.com/?apikey=bb9280f&i="+Movielist.Search[i].imdbID

    fetch(OMDbAPIID, {
        method: "GET"
    })

    .then((response) => response.json())
    .then((item) => {
        databyID = item
        console.log(databyID);

        let plotpopup = document.getElementById(`plot${i}`);
        plotpopup.innerHTML = databyID.Plot

        let actorspopup = document.getElementById(`actors${i}`);
        actorspopup.innerHTML = databyID.Actors
    })
}

function closePopup() {
    span = document.getElementsByClassName("close")[0];
    modal.style.display = "none";
}

// starting function with the click on the search bar
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const inputValue = searchInput.value;
    console.log(inputValue);
    changeAPi(inputValue);
    getMovielist(OMDbAPI);
});


// intersection observer to make the animation works with AOS
let options = {
    root: null, // relative to document viewport 
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 1.0 // visible amount of item shown in relation to root
};

function onChange(changes, observer) {
    changes.forEach(change => {
        if (change.intersectionRatio > 0) {
            // your observer logic
        }
    });
}

let observer = new IntersectionObserver(onChange, options);
let cards = document.querySelectorAll(".card");
cards.forEach(card => observer.observe(card));
 