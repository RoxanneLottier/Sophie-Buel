// UPLOAD WORKS
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(
        function loadWorks(works) {
            const sectionGallery = document.querySelector('.gallery');
        
            for (let i=0; i < works.length; i++) {
        
                const work = works[i];
        
                // Création des balises
                const workElement = document.createElement("figure");

                workElement.dataset.category = work.category.name;

                const imageElement = document.createElement('img');
                imageElement.src = work.imageUrl;
                const captionElement = document.createElement('figcaption');
                captionElement.innerText = work.title;
            
                workElement.appendChild(imageElement);
                workElement.appendChild(captionElement);
        
                sectionGallery.appendChild(workElement);
            
            } 
        }
     )
    .catch(error => console.log(error));
 // pourquoi est ce que je n'ai pas besoin d'appeler la fonction ?

 // CREATE BUTTONS
 const buttonSection = document.querySelector('.filters');

 fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then( 
        function createButtons (buttons) {
            // for (let i=0; i < buttons.length; i++) {

            //     const button = buttons[i];

            //     const buttonElement = document.createElement("button");
            //     buttonElement.innerText = button.name;
            //     buttonSection.appendChild(buttonElement)
            //     buttonElement.className = "btn-filter";
            //     buttonElement.dataset.filter = button.name;
            // }

            for (let j=0; j < buttons.length; j++) {
        const template = document.querySelector("#button-filter");
        const clone = template.content.cloneNode(true);
        var el = clone.querySelector("button");
        el.innerText=buttons[j].name;
        el.dataset.filter=buttons[j].name;
        buttonSection.appendChild(clone);
            }
        }
    )
    .catch(error => console.log(error));

// CREATE FILTER FOR BUTTONS
    buttonSection.addEventListener("click", (event) => {
        const el = event.target;

        const currentActiveEl = document.querySelectorAll(".active");
        currentActiveEl.forEach (el => {
            el.classList.remove("active");
        });
        el.classList.toggle("active");

        const filter = el.dataset.filter;

        const allFigures = document.querySelectorAll('[data-category]');
        const show = document.querySelectorAll(`[data-category="${filter}"]`);

        allFigures.forEach(e => {
            e.style.display = "none";
            if(filter === "tous") {
                allFigures.forEach(e => {
                    e.style.display = "block";
                });
            }
        });

        show.forEach(e => {
            e.style.display = "block";
        });               
        }

        );