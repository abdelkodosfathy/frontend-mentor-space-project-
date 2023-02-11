// set selectors
let planetNav = document.querySelector(".right-section .taps");
let planetImg = document.querySelector(".left-section .img");
let destinationText = document.querySelector("#destination");
let destinationinfo = document.querySelector("#destination .right-section");

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
            // let planetContent = document.querySelector(".planet-content");
            
            setPlanets(destinations);
            
        }
    };
    myRequest.open("GET","./data.json", true);
    myRequest.send();
}

getinfos();

//get planets data
function setPlanets (e) {
    for(let i = 0; i < e.length; i++){
        
        let planetTap = document.createElement("a",`href=#${e[i].name}`);

        planetTap.innerHTML = `${e[i].name}`
        planetNav.appendChild(planetTap);

        //for planets every num for planet
        let planetContent = document.createElement("div");
        planetContent.classList.add("planet-content");

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

        let paragraph = document.createElement("div");
        paragraph.classList.add("paragraph");
        
        paragraph.appendChild(planetName);
        paragraph.appendChild(planetText);
        
        planetContent.appendChild(paragraph);
        planetContent.appendChild(planetTravel);
        planetContent.appendChild(planetDistance);
        
        planetContent.classList.add("dis-no");
        planet.classList.add("dis-no");

        destinationinfo.appendChild(planetContent);
    }

    // select the planets 
    let arrTaps = document.querySelectorAll("#destination .taps a");
    let arrPlanets = document.getElementsByClassName("planet-content");
    let arrPlanetsContent = document.querySelectorAll(".left-section .img img");
    
    for(let i = 0; i < arrTaps.length;i++){
        arrTaps[i].onclick = () => hidePlanet(i);
    }
    function hidePlanet(x){
        for(let i = 0; i < 4; i++){
            arrTaps[i].classList.remove("hovered");
            arrPlanets[i].classList.add("dis-no");
            arrPlanetsContent[i].classList.add("dis-no");
        }
        arrPlanetsContent[x].classList.remove("dis-no");
        arrPlanets[x].classList.remove("dis-no");
        arrTaps[x].classList.add("hovered");
    }
    hidePlanet(0);
}

// select taps from navbar
function navselector(n) {
    for(let i = 0; i < 4; i++){
        navArray[i].classList.add("dis-no");
        navtaps[i].classList.remove("hovered");
    }
    navArray[n].classList.remove("dis-no");
    navtaps[n].classList.add("hovered");
    console.log(n);
}
for(let m = 0; m < 4; m++){
    navtaps[m].onclick = () => navselector(m);
}
