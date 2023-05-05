// LOGIN FORM

const logInForm = document.querySelector("#login-inputs");
// console.log(logInForm);

    logInForm.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(logInForm); 
        // console.log(formData);

        // var item ;
        // for (item of formData) {
        //     console.log(item[0], item[1]);
        // }

        const data = Object.fromEntries(formData);
        console.log(data);

        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify(data)
        }).then (response => response.json())
          .then ( data => {
            console.log(data);

            if(data.userId && data.token && data.token.length > 50) {
              window.location.assign('../index.html');
              sessionStorage.setItem("token", data.token);
            } else {
              //fonction to write error message if login not succesfull
              console.log('Email or password is wrong')
              const errorMessage = document.querySelector(".error-message");
              errorMessage.classList.remove("hide");
            }

            // if(data.hasOwnProperty('token') && data.token.length > 20) {
            //     console.log(data.token);
            //     // window.location.assign('../index.html');
            // }
        }
          )
          .catch(error => console.log(error));

    });