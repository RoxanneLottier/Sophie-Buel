// UPLOAD WORKS ON PAGE
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(

        function loadWorksGallery(works) {
            const sectionGallery = document.querySelector('.gallery');
        
            // FONCTION INITIAL

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
        })
    .catch(error => console.log(error));

// UPLOAD WORKS ON MODAL

    fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(

        function loadWorksModal(works) {

            const modalGallery = document.querySelector('.edit-gallery')
            for (let i=0; i < works.length; i++) {
    
                const work = works[i];
        
                // Création des balises
                const workElement = document.createElement("figure");

                workElement.dataset.id = work.id;

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

        })
    .catch(error => console.log(error));

 // CREATE FILTER BUTTONS
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
        console.log(allFigures);
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

// Change page to edit page if Token is in sessionStorage
const modifyButtons = document.querySelectorAll('.modify-button');

function editPage () {
    const tokenExists =(sessionStorage.getItem('token') !== null);
    const editBar = document.querySelector('#edit-mode');
    const logoutButton = document.querySelector('#logout');
        const loginButton = document.querySelector('#login');
    if (tokenExists) {
        console.log(sessionStorage.token);
        editBar.classList.remove('hide');

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
const modalFirstPage = document.querySelector('#modal-first-page');
const modalSecondPage = document.querySelector('#modal-second-page');

function openModal() {
modifyButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        modal.showModal();
        modalFirstPage.classList.remove("hide");
        modalSecondPage.classList.add("hide");
    })
})
}

openModal();

const closeButton = document.querySelectorAll('#close-modal');

closeButton.forEach(button => {
    button.addEventListener("click", (e) => {
    modal.close();
    })
})



// open modal second page

    const addImageButton = document.querySelector('#add-image-button');

    addImageButton.addEventListener('click', () => {

    modalFirstPage.classList.toggle("hide");
    modalSecondPage.classList.toggle("hide");

    })

    const backArrowButton = document.querySelector('#back-arrow');

    backArrowButton.addEventListener('click', () => {
        modalFirstPage.classList.toggle("hide");
        modalSecondPage.classList.toggle("hide");
    })


// DELETE WORKS ON MODAL

const editGallery = document.querySelector('.edit-gallery');

editGallery.addEventListener('click', (event) => {
    // const modalFigures = document.querySelectorAll('.edit-gallery figure');
    // console.log(modalFigures);

    const binIcon = event.target;
    const div = binIcon.parentNode;
    const figure = div.parentNode;
    const editGallery = figure.parentNode;

    if (event.target.matches(".bin-icon")) {
        
        editGallery.removeChild(figure);
    }
})

// ADD NEW IMAGE ON MODAL

const newWorkImage = document.querySelector('#new-image');
const inputFile = document.querySelector('#input-file');
var uploadedImage = "" ;

inputFile.addEventListener('change', function () {
    const pictureIcon = document.querySelector('#picture-icon');
    const inputFileLabel = document.querySelector('.add-image-wrapper label');
    const notations = document.querySelector('.add-image-wrapper p');
    const addImageWrapper = document.querySelector('.add-image-wrapper');

    newWorkImage.src = URL.createObjectURL(inputFile.files[0]);
    newWorkImage.classList.remove('hide');
    pictureIcon.classList.add('hide');
    inputFileLabel.classList.add('hide');
    notations.classList.add('hide');
    addImageWrapper.style.padding = "0";
})

// ADD CATEGORIE OPTIONS
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then( 
    function addOptions (options) {
        for (let i=0; i < options.length; i++) {
            const option = options[i]
            const category = document.querySelector('#category');

            const optionElement = document.createElement('option');
            optionElement.innerText= option.name;
            optionElement.value= option.name;
            category.appendChild(optionElement);
        }

}
    )
    .catch(error => console.log(error));




function logout () {

    const logoutButton = document.querySelector('#logout');

    logoutButton.addEventListener('click', () => {
      sessionStorage.removeItem("token");
    })
}

logout();




