// UPLOAD WORKS ON PAGE
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(

        function loadWorksGallery(works) {
            const sectionGallery = document.querySelector('.gallery');

            for (let i=0; i < works.length; i++) {
        
                const work = works[i];
        
                // Création des balises
                const workElement = document.createElement("figure");

                // adding a category and an id dataset
                workElement.dataset.category = work.category.name;
                workElement.dataset.id = work.id;

                const imageElement = document.createElement('img');
                imageElement.src = work.imageUrl;
                const captionElement = document.createElement('figcaption');
                captionElement.innerText = work.title;

                // linking chilren elements to parent element
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

                // adding id dataset
                workElement.dataset.id = work.id;

                const imageElement = document.createElement('img');
                imageElement.src = work.imageUrl;

                //div for edit icons (bin and move)
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

                // linking children elements to parent element
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

 // fetch the catgories in the API
 fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then( 
        function createButtons (buttons) {

            for (let j=0; j < buttons.length; j++) {

                // Create Template for the buttons
                const template = document.querySelector("#button-filter");

                // Clone template for each category in the API
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

        // Change Active status on buttons when selected
        const currentActiveEl = document.querySelectorAll(".active");

        // Remove active on "tous" which is on by default when page is loaded
        currentActiveEl.forEach (el => {
            el.classList.remove("active");
        });
        el.classList.toggle("active"); // toggle active on the selected button

        const filter = el.dataset.filter; // add filter on dataset category of buttons

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

// Change page to edit page if Token is in sessionStorage
const modifyButtons = document.querySelectorAll('.modify-button');

function editPage () {
    const tokenExists =(sessionStorage.getItem('token') !== null); // gets token if token is not null

    //edit mode graphics
    const editBar = document.querySelector('#edit-mode');
    const logoutButton = document.querySelector('#logout');
    const loginButton = document.querySelector('#login');

    // if token is in session storage show edit mode graphics
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

// open modal and show first page
function openModal() {
const portfolioModifyHeader = document.querySelector('#portfolio-title')
console.log(portfolioModifyHeader);

portfolioModifyHeader.addEventListener('click', (event) => {
    if (event.target.matches("a") || event.target.matches("img")) {
        event.preventDefault();
        modal.showModal();
        modalFirstPage.classList.remove("hide");
        modalSecondPage.classList.add("hide");
    }

})
}

openModal();

// Close modal with X icon
const closeButton = document.querySelectorAll('#close-modal');

closeButton.forEach(button => {
    button.addEventListener("click", () => {
    modal.close();
    })
})


// open modal second page

    // Open second page with add new image button
    const addImageButton = document.querySelector('#add-image-button');

    addImageButton.addEventListener('click', () => {

    modalFirstPage.classList.toggle("hide");
    modalSecondPage.classList.toggle("hide");

    })

    // go back to first page with arrow icon
    const backArrowButton = document.querySelector('#back-arrow');

    backArrowButton.addEventListener('click', () => {
        modalFirstPage.classList.toggle("hide");
        modalSecondPage.classList.toggle("hide");
    })

    // close modal when clicking outside the dialog

    modal.addEventListener("click", e => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          modal.close()
        }
      })


// ADD CATEGORIE OPTIONS IN SELECT INPUT ON MODAL
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then( 
    function addOptions (options) {
        for (let i=0; i < options.length; i++) {
            const option = options[i]
            const category = document.querySelector('#category');

            const optionElement = document.createElement('option');
            optionElement.innerText= option.name;
            optionElement.value= option.id;
            category.appendChild(optionElement);
            }
        }
    )
    .catch(error => console.log(error));


// DELETE WORKS IN MODAL & MAIN GALLERY

const editGallery = document.querySelector('.edit-gallery');


// add listener on modal gallery
editGallery.addEventListener('click', (event) => {
    event.preventDefault();
    // const modalFigures = document.querySelectorAll('.edit-gallery figure');
    const galleryFigures = document.querySelectorAll('[data-category]');
    // console.log(galleryFigures);

    // Use bubble effect to reach Figure from bin icon
    const modalBinIcon = event.target;
    const modalDiv = modalBinIcon.parentNode;
    const modalFigure = modalDiv.parentNode;
    const modalEditGallery = modalFigure.parentNode;

    // if click is on bin icon then remove figure
    if (event.target.matches(".bin-icon")) {
        
        modalEditGallery.removeChild(modalFigure);

        
        for(let i = 0; i < galleryFigures.length; i++) {
                if (modalFigure.dataset.id === galleryFigures[i].dataset.id) {
                    galleryFigures[i].remove();

                 // DELETE WORKS ON API
                fetch(`http://localhost:5678/api/works/${modalFigure.dataset.id}`, {
                method: 'DELETE',
                headers: {
                    accept: "*/*",
                    Authorization: "Bearer " + sessionStorage.token,
                    }
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Work deleted successfully');
                    } else {
                        console.log('Error while deleting work')
                    }
                    })
                .then ( data => console.log(data))
                .catch(error => console.log(error));
                }

            }
    }
})

// ADD NEW IMAGE ON MODAL 
// when new image is added modal closes and new images is added to the main page via the API.

const newWorkImage = document.querySelector('#new-image');
const inputFile = document.querySelector('#input-file');

// listener on File input
inputFile.addEventListener('change', function () {

    // Reach image icons that need to be hidden
    const pictureIcon = document.querySelector('#picture-icon');
    const inputFileLabel = document.querySelector('.add-image-wrapper label');
    const notations = document.querySelector('.add-image-wrapper p');
    const addImageWrapper = document.querySelector('.add-image-wrapper');

    // // ONE WAY TO DO IT WITH FILE READER 

    // var reader = new FileReader();
    // console.log(reader);
    // reader.addEventListener('load', (event) => {
    //     newWorkImage.src = event.target.result;
    // });
    //     reader.readAsDataURL(inputFile.files[0]);

    // OTHER WAY TO DO IT

    newWorkImage.src = URL.createObjectURL(inputFile.files[0]);
    newWorkImage.dataset.fileName = inputFile.files[0].name;

    // show image
    newWorkImage.classList.remove('hide');

    // hide all the other elements in the add image wrapper
    newWorkImage.classList.add('image-is-here');
    pictureIcon.classList.add('hide');
    inputFileLabel.classList.add('hide');
    notations.classList.add('hide');
    addImageWrapper.style.padding = "0";
});

// NEW WAY TEST ///////
const addImageForm = document.querySelector('#add-image-form');
console.log(addImageForm);

addImageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    //Image data
    const imageFile = inputFile.files[0];
    console.log(imageFile);
    const imageFileName = inputFile.files[0].name;
    console.log(imageFileName);

    // title data
    const titleInputValue = document.querySelector('#titre').value

    // Category data
    const categorySelected = document.querySelector('select').value;

    //Form data
    const formData = new FormData();
    formData.append('image', imageFile, imageFileName);
    formData.append('title', titleInputValue);
    formData.append('category', categorySelected);

    //Fetch
    fetch('http://localhost:5678/api/works', {
        method: "POST",
        body: formData,
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + sessionStorage.token,
        }
    })
    .then(response => {
        if (response.ok) {
            modal.close();
            location.reload();
            console.log('Work added successfully');
        } else {
            console.log('Error while adding work');
        }
        })
    .then ( data => console.log(data))
    .catch(error => console.log(error));
} )
// END NEW WAY TEST WORKS !!!!!!!!!!!!!!


// OLD WAY BADDDDDDDD
// SAVE IMAGE TO GALLERY ON MODAL & ON MAIN PAGE

// const validateAddImageButton = document.querySelector('#validate-add-image-button');
// const addImageForm = document.querySelector('#add-image-form');

// validateAddImageButton.addEventListener("click", (event) => {
//     event.preventDefault;

//     const titleInputValue = document.querySelector('#titre').value
//     console.log(titleInputValue);
//     console.log(newWorkImage.src);
//     let categorySelected = document.querySelector('select').value;
//     console.log(categorySelected);
//     console.log(sessionStorage.token);

//     const getBase64StringFromDataURL = (dataURL) =>
//         dataURL.replace('data:', '').replace(/^.+,/, '');

//     const formData = new FormData();
//     var file = new File([newWorkImage.src], "name")
//     // formData.append('image', newWorkImage.src);
//     formData.append('title', titleInputValue);
//     categorySelected = categorySelected*1
//     console.log(typeof categorySelected);
//     formData.append('category', categorySelected);
    
//     for (var pair of formData.entries()) {
//         console.log("%c%s%c key:%o value:%o type:%o", "color:green", "formData", "", pair[0], pair[1], typeof pair[1]);
//     }

//     fetch(newWorkImage.src)
//         .then ((res) => res.blob())
//         .then ((blob) => {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 console.log(reader.result);
//                 const base64 = getBase64StringFromDataURL(reader.result);
//                 const mytype = `image/${reader.result.split(';')[0].split('/')[1]}`;
//                 // const myFile = new File([reader.result], 'image.jpeg', {
//                 //     // type: reader.result.type,
//                 //     type:mytype
//                 // });
//                 const myFile = new File([base64], 'image.jpeg', {
//                     // type: reader.result.type,
//                     type:mytype
//                 });
//                 console.log("TYPE", myFile.type);

//                 formData.append('image', myFile);
//                 submitImage();
//             }
//             reader.readAsDataURL(blob);
//         })

//     function submitImage() {

//     fetch('http://localhost:5678/api/works', {
//         method: "POST",
//         body: formData,
//         headers: {
//             accept: "application/json",
//             Authorization: "Bearer " + sessionStorage.token,
//         }
//     })
//     .then (response => {
//         if(response.ok){
//             // close modal
//             modal.close();
//             // refresh page
//             location.reload();
//             // reset form
//         }
//     })
//     .then ( data => console.log(data))
//     .catch(error => console.log(error));
// }

//     // if (newWorkImage.classList.contains('image-is-here') && titleInputValue.length > 0) {

//     // //     // load image to server 



//     // }
// });

// RESET ADD IMAGE FORM AND IMAGE

// function resetAddImageForm () {
//     // newWorkImage.src = null; // RETURNS ERROR
//     document.querySelector("#add-image-form").reset();
// };
// resetAddImageForm();

// LOGOUT

function logout () {

    const logoutButton = document.querySelector('#logout');

    logoutButton.addEventListener('click', () => {
      sessionStorage.removeItem("token");
    })
}

logout();




