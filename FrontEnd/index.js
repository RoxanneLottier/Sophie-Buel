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

 const buttonSection = document.querySelector('.filters');

 fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then( 
        function createButtons (buttons) {
            for (let i=0; i < buttons.length; i++) {

                const button = buttons[i];

                const buttonElement = document.createElement("button");
                buttonElement.innerText = button.name;
                buttonSection.appendChild(buttonElement)
                buttonElement.className = "btn-filter";
                buttonElement.dataset.filter = button.name;
            }
        }
    )
    .catch(error => console.log(error));


    buttonSection.addEventListener("click", (event) => {
        const el = event.target;

        const filter = el.dataset.filter;
        console.log(filter);

        const allFigures = document.querySelectorAll('[data-category]');
        const show = document.querySelectorAll(`[data-category="${filter}"]`);

        console.log(`[data-category="${filter}"]`);
        

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
        })

    });


// LOGIN FORM

// function listenerLogIn() {
//     const logInForm = document.querySelector(#login-inputs);
//     logInForm.addEventListener("submit", function (event){
//         event.preventDefault();

//         const login = {
//             email: event.target.querySelector("name=email").value,
//             motDePasse: event.target.querySelector("name=password").value,
//         }

//         const body = JSON.stringify(login);

//         fetch("http://localhost:5678/api/users/login", {
//             method: "POST",
//             headers: { "Content-type": "application/json"},
//             body: body
//         });

//     });
// }