// UPLOAD WORKS
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(

        function loadWorks(works, type='modal') {
            const sectionGallery = document.querySelector('.gallery');
        
            // FONCTION INITIAL

            // for (let i=0; i < works.length; i++) {
        
            //     const work = works[i];
        
            //     // Création des balises
            //     const workElement = document.createElement("figure");

            //     workElement.dataset.category = work.category.name;

            //     const imageElement = document.createElement('img');
            //     imageElement.src = work.imageUrl;
            //     const captionElement = document.createElement('figcaption');
            //     captionElement.innerText = work.title;
            
            //     workElement.appendChild(imageElement);
            //     workElement.appendChild(captionElement);
        
            //     sectionGallery.appendChild(workElement);
            
            // } 

            if (type === 'gallery') {
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

            } else if (type === 'modal') { 
                const modalGallery = document.querySelector('.edit-gallery')
                for (let i=0; i < works.length; i++) {
        
                    const work = works[i];
            
                    // Création des balises
                    const workElement = document.createElement("figure");
    
                    workElement.dataset.category = work.category.name;
    
                    const imageElement = document.createElement('img');
                    imageElement.src = work.imageUrl;

                    //div for edit icons
                    const editElements = document.createElement("div");
                    editElements.classList.add("edit-icons");

                    const binIconElement = document.createElement('img')
                    binIconElement.src = "./assets/icons/binicon.svg";

                    const moveIconElement = document.createElement('img');
                    moveIconElement.src = "./assets/icons/moveicon.svg"

                    binIconElement.classList.add("bin-icon");
                    moveIconElement.classList.add("move-icon");

                    const captionElement = document.createElement('figcaption');
                    captionElement.innerText = 'éditer';
                
                    workElement.appendChild(imageElement);
                    workElement.appendChild(captionElement);
                    workElement.appendChild(editElements);
                    editElements.appendChild(binIconElement);
                    editElements.appendChild(moveIconElement);
            
                    modalGallery.appendChild(workElement);
                
                } 

            }
        }

     )
    .catch(error => console.log(error));

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

// Change page if Token is in sessionStorage
const modifyButtons = document.querySelectorAll('.modify-button');

function editPage () {
    const tokenExists =(sessionStorage.getItem('token') !== null);
    if (tokenExists) {
        console.log(sessionStorage.token);
        const editBar = document.querySelector('#edit-mode');
        editBar.classList.remove('hide');

        const logoutButton = document.querySelector('#logout');
        const loginButton = document.querySelector('#login');
        logoutButton.classList.remove('hide');
        loginButton.classList.add('hide');

        buttonSection.classList.add('hide');

        modifyButtons.forEach(button => {
            button.classList.remove('hide');
        })
        
    }
}

editPage();

// Create Modal

const modal = document.querySelector('#modal-gallery');

function openModal() {
modifyButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        modal.showModal();
    })
})
}

openModal();

const closeButton = document.querySelector('#close-modal');

closeButton.addEventListener("click", (e) => {
    modal.close();
} )


// open modal add image

    const addImageButton = document.querySelector('#add-image-button');
console.log(addImageButton);

addImageButton.addEventListener('click', (event) => {
    console.log(event.target);
})

