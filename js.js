// set selectors
let planetNav = document.querySelector(".right-section .taps");
let planetImg = document.querySelector(".left-section .img");
let destinationText = document.querySelector("#destination .paragraph");
let destinationinfo = document.querySelector("#destination .right-section .planet-content");

let navArray = document.getElementsByClassName("nav-item");
let navtaps = document.getElementsByClassName("nav-selector");



function getinfos() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if(myRequest.readyState === 4 && myRequest.status === 200) {
            const jsonOpj = JSON.parse(this.responseText);
            let destinations = jsonOpj.destinations;
            let crew = jsonOpj.crew;
            let technology = jsonOpj.technology;
            let planetContent = document.querySelector(".planet-content");
            
            setPlanets(destinations,planetContent);
        }
    };
    myRequest.open("GET","./data.json", true);
    myRequest.send();
}

getinfos();

//get planets data
function setPlanets (e,s) {
    for(let i = 0; i < 4; i++){
        
        let planetTap = document.createElement("a",`href=#${e[i].name}`);

        planetTap.innerHTML = `${e[i].name}`
        planetNav.appendChild(planetTap);

        //for planets every num for planet
        let planetName = document.createElement("h1");
        planetName.innerHTML = `${e[i].name}`;

        let planetText = document.createElement("p");
        planetText.innerHTML = `${e[i].description}`;

        let planetTravel = document.createElement("div");
        planetTravel.innerHTML =  `<h5>est. travel time</h5><p>${e[i].travel}</p>`;
        planetTravel.classList.add('time');
        
        let planetDistance = document.createElement("div");
        planetDistance.classList.add('distance');
        planetDistance.innerHTML = `<h5>avg. distance</h5><p>${e[i].distance}</p>`;

        let planet = document.createElement("img");
        planet.setAttribute("src",`${e[i].images.webp}`);
        planetImg.appendChild(planet);

        destinationText.appendChild(planetName);
        destinationText.appendChild(planetText);

        destinationinfo.appendChild(planetDistance);
        destinationinfo.appendChild(planetTravel);

        s.classList.add("dis-no");
        planetImg.classList.add("dis-no");
    }
    // let planetContent = document.querySelector(".planet-content");
    // function clicked () {
    //     destinationinfo.classList.add("dis-no");
        
    // }
    // planetTap.onclick = () => {
    //     console.log(planetContent);
    // }
}

function navselector(n) {
    for(let i = 0; i < 4; i++){
        navArray[i].classList.add("dis-no");
    }
    navArray[n].classList.remove("dis-no");
    console.log(n);
}
for(let m = 0; m < 4; m++){
    navtaps[m].onclick = () => navselector(m);
    // planetsNav[m].onclick = () => planetSelector(m);
}
