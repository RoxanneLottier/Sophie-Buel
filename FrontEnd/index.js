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

loadWorks();


