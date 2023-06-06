// UPLOAD WORKS ON PAGE
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then(
        function loadWorksGallery(works) {
            const sectionGallery = document.querySelector(".gallery");

            for (let i=0; i < works.length; i++) {
                const work = works[i];

                // Creating elements in the DOM
                const workElement = document.createElement("figure");
                workElement.dataset.category = work.category.name; // adding a category and an id dataset
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

                //Creating elements in the DOM
                const workElement = document.createElement("figure");
                workElement.dataset.id = work.id; // adding id dataset

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

// UTILITY FUNCTIONS

/*
assert giving a condition return and erreor message if condition fail
*/
const assert = function (condition, errorMessage, ErrorType = Error) {
    if (!condition) throw new ErrorType(errorMessage);
  }

//Function that checks if element is and HTML element
function isElement(element) {
    return element instanceof Element;
}

// MAIN FUNCTION THAT RUNS ALL THE FUNCTIONS (with explanation) (functions that are not linked to eventlisteners)

function main () {
    createButtonSection(); // Function to create the buttons in filter bar
    showEditPage(); // Function to show the edit page once loged in
}
main();

// ALL CLICK EVENT LISTENER ON PAGE
document.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target.matches(".portfolio-title .modify-button p") || event.target.matches(".portfolio-title .modify-button img") ) {
        event.preventDefault();
        openModal(); // function that open modal
    }
    if (event.target.matches("#close-modal")) {
        closeModal(); // function that closes modal
    }
    if (event.target.matches("#modal-gallery")) {
        closeModalOnBackdropClick (event) // function that closes modal when clicking the backdrop
    }
    if (event.target.matches("#add-image-button")) {
        showModalSecondPage(); // function that hides page1 of modal and shows page 2
    }
    if (event.target.matches("#back-arrow")) {
        showModalFirstPage(); // function the hides page 2 of modal and shows page 1
    }
    // REFRESH PAGE ON CLICK OF PUBLISH BUTTON ON TOP OF THE EDIT PAGE (AESTHETIC BUTTON)
    if (event.target.matches(".edit-mode button")) {
        location.reload();
    }
    if (event.target.matches("#logout")) {
        logout(); // function that logs out of edit mode
    }
    if (event.target.matches(".filters button")) {
        activefilterButtons(event); // function that activates button when clicked for filter by changing style to green
        filterButtons(event); // function the uses the buttons to filter the gallery
    }
    if (event.target.matches(".bin-icon")) {
        deleteWorks(event);
        // function the englobes 3 functions, delete work in modal, delete work in gallery and delete work in API
    }
})

// ALL SUBMIT EVENT LISTENER ON PAGE
document.addEventListener("submit", (event) => {
    if (event.target.matches("#add-image-form")){
        event.preventDefault();
        addWorksToAPI(); // function that adds works to API
    }
})

///ALL THE FUNCTIONS IN THE PAGE !!!!!!!

 // CREATE FILTER BUTTONS WITH CALL TO API
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

// MAKE BUTTON ACTIVE WHEN FILTERED
function activefilterButtons(event) {

    const element = event.target; // define target

    // define target that has active class
    const currentActiveElement = document.querySelectorAll(".active");

    // Remove active on "tous" which is on by default when page is loaded
    currentActiveElement.forEach (element => {
        element.classList.remove("active");
    });
    // toggle active on the selected button
    element.classList.toggle("active");

}

// FILTER BUTTONS

function filterButtons(event) {

    const element = event.target; // define target

    // add filter method on dataset of buttons
    const filter = element.dataset.filter;

    // Reach all the figures
    const allFigures = document.querySelectorAll("[data-category]");

    // create constante with selected filter
    const filteredFigures = document.querySelectorAll(`[data-category="${filter}"]`);

    allFigures.forEach(figure => {
        figure.style.display = "none"; // Hide all figures
        if(filter === "tous") { //if filter is "tous" unhide all figures
            allFigures.forEach(figure => {
                figure.style.display = "block";
            });
        }
    });

    // show figures that are filtered
    filteredFigures.forEach(figure => {
        figure.style.display = "block";
    });
}

// CREATE EDIT PAGE
function createEditPage () {
    // Remove login & filter bar
    const loginButton = document.querySelector("#login"); // login button
    const buttonSection = document.querySelector(".filters"); // Filter bar
    loginButton.classList.add("hide");
    buttonSection.classList.add("hide");

    //Add edit mode graphics
    const modifyButtons = document.querySelectorAll(".modify-button"); // Modifer buttons
    const editBar = document.querySelector("#edit-mode"); // Black edit bar on top
    const logoutButton = document.querySelector("#logout"); // logout button
    loginButton.classList.add("hide");
    buttonSection.classList.add("hide");
    editBar.classList.remove("hide");
    logoutButton.classList.remove("hide");
    modifyButtons.forEach(button => {
        button.classList.remove("hide");
    })
};

// SHOW EDIT PAGE WHEN TOKEN IS IN STORAGE
function showEditPage () {
    if (sessionStorage.getItem("token") !== null) {
        console.log(sessionStorage.token);
        createEditPage();
    } else {
        console.log('Authentification error, token not found')
    }
}

// OPEN MODAL & SHOW FIRST PAGE
function openModal () {
    const modal = document.querySelector("#modal-gallery");
    try {
        assert(
            isElement(modal) === true
            , "Error modal element is not part of the DOM"
            , TypeError
            );
    //open modal
    modal.showModal();
    //Show first page
    showModalFirstPage();
    } catch (error) {
        console.log(error.message);
    }
}

// CLOSE MODAL WITH X ICON
function closeModal() {
    const modal = document.querySelector("#modal-gallery");
    try {
        assert(
            isElement(modal) === true
            , "Error modal element is not part of the DOM"
            , TypeError
            );
        //close modal
        modal.close();
        // reset form
        resetAddImageForm();
        // reset error message
        const errorMessage = document.querySelector(".error-message");
        errorMessage ? errorMessage.classList.add("hide") : errorMessage.classList.remove("hide");
    } catch (error) {
        console.log(error.message);
    }
}

// CLOSE MODAL ON BACKDROP CLICK
function closeModalOnBackdropClick (event) {

    const modal = document.querySelector("#modal-gallery");
    try {
        assert(
            isElement(modal) === true
            , "Error modal element is not part of the DOM"
            , TypeError
            );
        const dialogDimensions = modal.getBoundingClientRect()

        if (
            event.clientX < dialogDimensions.left ||
            event.clientX > dialogDimensions.right ||
            event.clientY < dialogDimensions.top ||
            event.clientY > dialogDimensions.bottom
        ) {
            modal.close()
            // Reset form
        resetAddImageForm();
        // reset error message
        const errorMessage = document.querySelector(".error-message");
        errorMessage ? errorMessage.classList.add("hide") : errorMessage.classList.remove("hide");
        }
    } catch (error) {
        console.log(error.message);
    }
}

// OPEN MODAL PAGE 1
function showModalFirstPage() {
    const modalFirstPage = document.querySelector("#modal-first-page");
    const modalSecondPage = document.querySelector("#modal-second-page");

    try {
        assert(
            isElement(modalFirstPage) === true && isElement(modalSecondPage) === true
            , "Error on or more element/s is/are not part of the DOM"
            , TypeError
            );
        modalFirstPage.classList.remove("hide");
        modalSecondPage.classList.add("hide");
    } catch (error) {
        console.log(error.message);
    }
}

// OPEN MODAL PAGE 2
function showModalSecondPage() {
    const modalFirstPage = document.querySelector("#modal-first-page");
    const modalSecondPage = document.querySelector("#modal-second-page");

    try {
        assert(
            isElement(modalFirstPage) === true && isElement(modalSecondPage) === true
            , "Cannot show second page of modal, element/s is/are not part of the DOM"
            , TypeError
            );
        modalFirstPage.classList.add("hide");
        modalSecondPage.classList.remove("hide");
        addImage(); // Function that add Image File in the image Form and displays it
        selectCategories(); // Function that generates the categories in the image Form in the modal
    } catch (error) {
        console.log(error.message);
    }
}

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

// DELETE WORKS
function deleteWorks(event){
    let modalId;

    function deleteWorksOnModal(event) {
        const modalBinIcon = event.target;
        const modalDiv = modalBinIcon.parentNode;
        const modalFigure = modalDiv.parentNode;
        const modalEditGallery = modalFigure.parentNode;
        modalId = modalFigure.dataset.id
        modalEditGallery.removeChild(modalFigure);
    }
    deleteWorksOnModal(event)

    function deleteWorksOnGAllery() {
        const galleryFigures = document.querySelectorAll("[data-category]");

            for(let i = 0; i < galleryFigures.length; i++) {
                if(modalId === galleryFigures[i].dataset.id) {
                    galleryFigures[i].remove();
                }
            }
    }
    deleteWorksOnGAllery();

    function deleteWorksOnAPI() {
        fetch(`http://localhost:5678/api/works/${modalId}`, {
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
    deleteWorksOnAPI()
}

// ADD NEW IMAGE ON MODAL
function addImage() {
    const newWorkImage = document.querySelector("#new-image");
    const inputFile = document.querySelector("#input-file");

    try {
        assert(
        isElement(newWorkImage) === true && isElement(inputFile) === true
        , "One or more element/s is/are not part of the DOM"
        , TypeError
        );

        inputFile.addEventListener("change", function () {

            newWorkImage.src = URL.createObjectURL(inputFile.files[0]);
            newWorkImage.dataset.fileName = inputFile.files[0].name;

            newWorkImage.classList.remove("hide");  // show image

            hideInputFile(); // hide all the other elements in the add image wrapper
        });
    } catch (error) {
        console.log(error.message);
    }
}

// HIDES INPUT FILE
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

// SHOW INPUT FILE
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

// ADD WORKS TO THE API
function addWorksToAPI() {
    const inputFile = document.querySelector("#input-file");

    //Image data
    const imageFile = inputFile.files[0];
    const imageFileName = inputFile.files[0]?.name; // .? making constante undifined when file is undefined (optional chaining operator)

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
                    closeModal();
                    location.reload(); // reload page to see new works on page
                    console.log("Work added successfully");
                } else {
                    console.log("Error while adding work");
                    const errorMessage = document.querySelector(".error-message");
                    errorMessage.classList.remove("hide");
                }
                })
            .catch(error => console.log(error));

        } catch (e) {
            console.log(e);
            const errorMessage = document.querySelector(".error-message");
            errorMessage.classList.remove("hide");
        }
}

// RESET ADD IMAGE FORM
function resetAddImageForm () {
    const addImageForm = document.querySelector("#add-image-form")
    try {
        assert(
            isElement(addImageForm) === true
            , "Form not found, element is not part of the DOM"
            , TypeError
            );
        addImageForm.reset();
        showInputFile();
    } catch (error){
        console.log(error.message);
    }
};

// LOGOUT
function logout () {
    sessionStorage.removeItem("token");
    location.reload();
}