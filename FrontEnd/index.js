// UPLOAD WORKS ON PAGE
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then(

        function loadWorksGallery(works) {

            const sectionGallery = document.querySelector(".gallery");

            for (let i=0; i < works.length; i++) {
                const work = works[i];

                // Création des balises
                const workElement = document.createElement("figure");

                // adding a category and an id dataset
                workElement.dataset.category = work.category.name;
                workElement.dataset.id = work.id;

                const imageElement = document.createElement("img");
                imageElement.src = work.imageUrl;
                const captionElement = document.createElement("figcaption");
                captionElement.innerText = work.title;

                // linking chilren elements to parent element
                workElement.appendChild(imageElement);
                workElement.appendChild(captionElement);

                sectionGallery.appendChild(workElement);

            }
        })
    .catch(error => console.log(error));

// UPLOAD WORKS ON MODAL

    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(

        function loadWorksModal(works) {

            const modalGallery = document.querySelector(".edit-gallery")
            for (let i=0; i < works.length; i++) {

                const work = works[i];

                // Création des balises
                const workElement = document.createElement("figure");

                // adding id dataset
                workElement.dataset.id = work.id;

                const imageElement = document.createElement("img");
                imageElement.src = work.imageUrl;

                //div for edit icons (bin and move)
                const editElements = document.createElement("div");
                editElements.classList.add("edit-icons");

                const binIconElement = document.createElement("img")
                binIconElement.src = "./assets/icons/binicon.svg";

                const moveIconElement = document.createElement("img");
                moveIconElement.src = "./assets/icons/moveicon.svg"

                binIconElement.classList.add("bin-icon");
                moveIconElement.classList.add("move-icon");

                const captionElement = document.createElement("figcaption");
                captionElement.innerText = "éditer";

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

 function createButtonSection() {
    const buttonSection = document.querySelector(".filters");

    // fetch the catgories in the API
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(
            function createButtons (buttons) {
                // Create Template for the buttons
                const template = document.querySelector("#button-filter");

                for (let j=0; j < buttons.length; j++) {

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
}

createButtonSection();

// CREATE FILTER FOR BUTTONS

function filterButtons() {
    const buttonSection = document.querySelector(".filters");

    buttonSection.addEventListener("click", (event) => {
        const el = event.target;

        // Change Active status on buttons when selected
        const currentActiveEl = document.querySelectorAll(".active");

        // Remove active on "tous" which is on by default when page is loaded
        currentActiveEl.forEach (el => {
            el.classList.remove("active");
        });
        // toggle active on the selected button
        el.classList.toggle("active");

        // add filter on dataset category of buttons
        const filter = el.dataset.filter;

        const allFigures = document.querySelectorAll("[data-category]");
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
}

filterButtons();

// Create edit page

function createEditPage () {
    const buttonSection = document.querySelector(".filters");
    const modifyButtons = document.querySelectorAll(".modify-button");

    //edit mode graphics
    const editBar = document.querySelector("#edit-mode");
    const logoutButton = document.querySelector("#logout");
    const loginButton = document.querySelector("#login");

    editBar.classList.remove("hide");
    logoutButton.classList.remove("hide");
    loginButton.classList.add("hide");
    buttonSection.classList.add("hide");
    modifyButtons.forEach(button => {
        button.classList.remove("hide");
    })

};

// Show edit page if token is in session storage
function showEditPage () {
    if (sessionStorage.getItem("token") !== null) {
        console.log(sessionStorage.token);
        createEditPage();
    } else {
        console.log('Authentification error, token not found')
    }
}
showEditPage();

function showModalFirstPage() {
    const modalFirstPage = document.querySelector("#modal-first-page");
    const modalSecondPage = document.querySelector("#modal-second-page");

    modalFirstPage.classList.remove("hide");
    modalSecondPage.classList.add("hide");

}


// open modal and show first page
function openModal() {
    const portfolioModifyHeader = document.querySelector("#portfolio-title")
    const modal = document.querySelector("#modal-gallery");

    portfolioModifyHeader.addEventListener("click", (event) => {
        if (event.target.matches("a") || event.target.matches("img")) {
            event.preventDefault();
            modal.showModal();
            showModalFirstPage();
        }
    })
    }

openModal();

// Close modal with X icon

function closeModal() {
    const closeButton = document.querySelectorAll("#close-modal");
    const modal = document.querySelector("#modal-gallery");

    closeButton.forEach(button => {
        button.addEventListener("click", () => {
        modal.close();
        // reset form
        resetAddImageForm();
        // reset error message
        const errorMessage = document.querySelector(".error-message");
        errorMessage ? errorMessage.classList.add("hide") : errorMessage.classList.remove("hide");
        })
    })
}

closeModal();

// open modal second page

function changePagesInModal() {

    // Open second page with add new image button
    const addImageButton = document.querySelector("#add-image-button");

    addImageButton.addEventListener("click", () => {
    const modalFirstPage = document.querySelector("#modal-first-page");
    const modalSecondPage = document.querySelector("#modal-second-page");

    modalFirstPage.classList.add("hide");
    modalSecondPage.classList.remove("hide");

    })

    // go back to first page with arrow icon
    const backArrowButton = document.querySelector("#back-arrow");

    backArrowButton.addEventListener("click", () => {
        showModalFirstPage();
    })

}

changePagesInModal();

    // close modal when clicking outside the dialog

function closeModalOnBackdropClick() {

    const modal = document.querySelector("#modal-gallery");

    modal.addEventListener("click", e => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          modal.close()
          // refresh page on modal close to refresh form
        //   location.reload();
        resetAddImageForm();
        // reset error message
        const errorMessage = document.querySelector(".error-message");
        errorMessage ? errorMessage.classList.add("hide") : errorMessage.classList.remove("hide");
        }
      })
}

closeModalOnBackdropClick();

// ADD CATEGORIE OPTIONS IN SELECT INPUT ON MODAL
function selectCategories() {
fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(
    function addOptions (options) {
        for (let i=0; i < options.length; i++) {
            const option = options[i]
            const category = document.querySelector("#category");

            const optionElement = document.createElement("option");
            optionElement.innerText= option.name;
            optionElement.value= option.id;
            category.appendChild(optionElement);
            }
        }
    )
    .catch(error => console.log(error));
}
selectCategories();

// DELETE WORKS IN MODAL & MAIN GALLERY

function deleteWorks() {
    const editGallery = document.querySelector(".edit-gallery");

// add listener on modal gallery
    editGallery.addEventListener("click", (event) => {
        event.preventDefault();
        const galleryFigures = document.querySelectorAll("[data-category]");

        // Use bubble effect to reach Figure from bin icon
        const modalBinIcon = event.target;
        const modalDiv = modalBinIcon.parentNode;
        const modalFigure = modalDiv.parentNode;
        const modalEditGallery = modalFigure.parentNode;

        // if click is on bin icon then remove figure
        if (event.target.matches(".bin-icon")) {

            // Remove figure in Modal
            modalEditGallery.removeChild(modalFigure);

            for(let i = 0; i < galleryFigures.length; i++) {
                    if (modalFigure.dataset.id === galleryFigures[i].dataset.id) {
                         // Remove figure in main gallery
                        galleryFigures[i].remove();

                        // DELETE WORKS ON API
                        fetch(`http://localhost:5678/api/works/${modalFigure.dataset.id}`, {
                        method: "DELETE",
                        headers: {
                            accept: "*/*",
                            Authorization: "Bearer " + sessionStorage.token,
                            }
                        })
                        .then(response => {
                            if (response.ok) {
                                console.log("Work deleted successfully");
                            } else {
                                console.log("Error while deleting work")
                            }
                            })
                        .then ( data => console.log(data))
                        .catch(error => console.log(error));
                        }
                }
        }
    })
}

deleteWorks();

// ADD NEW IMAGE ON MODAL
// when new image is added modal closes and new images is added to the main page via the API.

function addImageForm() {
    const newWorkImage = document.querySelector("#new-image");
    const inputFile = document.querySelector("#input-file");

    // listener on File input
    inputFile.addEventListener("change", function () {

        // // ONE WAY: WITH FILE READER

        // var reader = new FileReader();
        // console.log(reader);
        // reader.addEventListener('load', (event) => {
        //     newWorkImage.src = event.target.result;
        // });
        //     reader.readAsDataURL(inputFile.files[0]);

        // OTHER WAY

        newWorkImage.src = URL.createObjectURL(inputFile.files[0]);
        newWorkImage.dataset.fileName = inputFile.files[0].name;

        // show image
        newWorkImage.classList.remove("hide");
        newWorkImage.classList.add("image-is-here");

        // hide all the other elements in the add image wrapper
        hideInputFile();
    });
}

addImageForm();
// NEW WAY TEST ///////

function hideInputFile() {
    const pictureIcon = document.querySelector("#picture-icon");
    const inputFileLabel = document.querySelector(".add-image-wrapper label");
    const notations = document.querySelector(".add-image-wrapper p");
    const addImageWrapper = document.querySelector(".add-image-wrapper");


    pictureIcon.classList.add("hide");
    inputFileLabel.classList.add("hide");
    notations.classList.add("hide");
    addImageWrapper.style.padding = "0";
};

function showInputFile() {
    const newWorkImage = document.querySelector("#new-image");
    const pictureIcon = document.querySelector("#picture-icon");
    const inputFileLabel = document.querySelector(".add-image-wrapper label");
    const notations = document.querySelector(".add-image-wrapper p");
    const addImageWrapper = document.querySelector(".add-image-wrapper");

    newWorkImage.classList.add("hide");
    pictureIcon.classList.remove("hide");
    inputFileLabel.classList.remove("hide");
    notations.classList.remove("hide");
    addImageWrapper.style.padding = "18px 120px";
};

function addWorksToAPI() {
    const addImageForm = document.querySelector("#add-image-form");
    const inputFile = document.querySelector("#input-file");
    const modal = document.querySelector("#modal-gallery");

    addImageForm.addEventListener("submit", (event) => {
        event.preventDefault();
        //Image data
        const imageFile = inputFile.files[0];
        console.log(imageFile);
        const imageFileName = inputFile.files[0]?.name; // .? making constante undifined when file is undefined (optional chaining operator)
        console.log(imageFileName);

        // title data
        const titleInputValue = document.querySelector("#titre").value

        // Category data
        const categorySelected = document.querySelector("select").value;

        // try to create form data and send data and catch error if there is no image.
        // was not writting error message because could not find File Name.

        try {

            //Form data
            const formData = new FormData();
            formData.append("image", imageFile, imageFileName);
            formData.append("title", titleInputValue);
            formData.append("category", categorySelected);

            //Fetch
            fetch("http://localhost:5678/api/works", {
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
                    console.log("Work added successfully");
                } else {
                    console.log("Error while adding work");
                    const errorMessage = document.querySelector(".error-message");
                    errorMessage.classList.remove("hide");
                }
                })
            .then ( data => console.log(data))
            .catch(error => console.log(error));

        } catch (e) {
            console.log(e);
            const errorMessage = document.querySelector(".error-message");
            errorMessage.classList.remove("hide");
        }

    })
}

addWorksToAPI();


// RESET ADD IMAGE FORM AND IMAGE

function resetAddImageForm () {
    const newWorkImage = document.querySelector("#new-image");
    newWorkImage.src = ''; // RETURNS ERROR
    document.querySelector("#add-image-form").reset();
    showInputFile();
};

// REFRESH PAGE ON CLICK OF PUBLISH BUTTON

function publishChanges () {
    const editBar = document.querySelector("#edit-mode")

    editBar.addEventListener("click", (event) => {
        if (event.target.matches("button")) {
            location.reload();
        }
    })
}

publishChanges();

// LOGOUT

function logout () {

    const logoutButton = document.querySelector("#logout");

    logoutButton.addEventListener("click", () => {
      sessionStorage.removeItem("token");
    })
}

logout();




