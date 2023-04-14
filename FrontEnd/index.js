// FONCTION THAT LOADS THE PAGE
const loadWorks = async () => {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const works = await response.json();

        for (let i=0; i < works.length; i++) {

            const work = works[i];
        
            // // Récupération de l'element du DOM qui acceuillera les travaux
            const sectionGallery = document.querySelector('.gallery');
        
            // // Création des balises
            const workElement = document.createElement("figure");
            const imageElement = document.createElement('img');
            imageElement.src = work.imageUrl;
            const captionElement = document.createElement('figcaption');
            captionElement.innerText = work.title;
            
            sectionGallery.appendChild(workElement);
            
            workElement.appendChild(imageElement);
            workElement.appendChild(captionElement);
            
          }  


    } catch (error) {
        console.error(error);
    } 

}

// FIRST LOADING OF THE PAGE

loadWorks();

// LISTENER TO FILTER THE WORKS

const buttonFilters = async () => {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    
    const buttonFilterObjets = document.querySelector('.btn-filter');

    buttonFilterObjets.addEventListener("click", function(){
        const objetsFiltered = works.filter( function (work) {
            return work.category.name === 'Objets';
        });
        document.querySelector('.gallery').innerHTML = '';
        loadWorks(objetsFiltered);
    });

}

buttonFilters();

// LOADED CATEGORIES AND LOOPED ARRAY BY ID CATEGORY

// const loadCategories = async () => {
//     try {
//         const response = await fetch('http://localhost:5678/api/categories');
//         const categories = await response.json();

//         for (let i=0; i < categories.length; i++) {

//         const categorie = categories[i];

//         console.log(categorie.id);
//         }

//     } catch (error) {
//         console.error(error);
//     } 
// }
// loadCategories();




// BUTTON FILTER

// const buttonFilter = document.querySelector('btn-filter');

// buttonFilter.addEventListener("click", function(){
//     const objetsFilter = categories.filter( categorie => {
//         return categorie.id === 1;
//     });
//     console.log(objetsFilter);
// });


