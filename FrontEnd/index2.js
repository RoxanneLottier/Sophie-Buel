const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

// FONCTION THAT LOADS THE PAGE
function loadWorks(works) {
    for (let i=0; i < works.length; i++) {

        const work = works[i];

        // Récupération de l'element du DOM qui acceuillera les travaux
        const sectionGallery = document.querySelector('.gallery');

        // Création des balises
        const workElement = document.createElement("figure");
        const imageElement = document.createElement('img');
        imageElement.src = work.imageUrl;
        const captionElement = document.createElement('figcaption');
        captionElement.innerText = work.title;
    
        sectionGallery.appendChild(workElement);
    
        workElement.appendChild(imageElement);
        workElement.appendChild(captionElement);
    
    }  
}
// FIRST LOADING OF THE PAGE
loadWorks(works);

// LISTENER TO UNFILTER

const buttonUnfilter = document.querySelector('button:nth-child(1)');

    buttonUnfilter.addEventListener("click", function(){
        document.querySelector('.gallery').innerHTML = '';
        loadWorks(works);
        });


// LISTENER TO FILTER THE WORKS OF OBJECT
const buttonFilterObjets = document.querySelector('button:nth-child(2)');

    buttonFilterObjets.addEventListener("click", function(){
        const objetsFiltered = works.filter(function (work) {
            return work.category.name === 'Objets';
        });
        document.querySelector('.gallery').innerHTML = '';
        loadWorks(objetsFiltered);
    });

// LISTENER TO FILTER THE WORKS OF APPARTEMENTS
const buttonFilterAppartements = document.querySelector('button:nth-child(3)');

    buttonFilterAppartements.addEventListener("click", function(){
        const appartementsFiltered = works.filter(function (work) {
            return work.category.name === 'Appartements';
        });
        document.querySelector('.gallery').innerHTML = '';
        loadWorks(appartementsFiltered);
    });

// LISTENER TO FILTER THE WORKS OF HOTELS AND RESTAURANTS
const buttonFilterHetR = document.querySelector('button:nth-child(4)');

    buttonFilterHetR.addEventListener("click", function(){
        const hEtRFiltered = works.filter(function (work) {
            return work.category.name === 'Hotels & restaurants';
        });
        document.querySelector('.gallery').innerHTML = '';
        loadWorks(hEtRFiltered);
    });