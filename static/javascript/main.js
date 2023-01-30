// ---------------- Sign-up-button-declaration ------------------

const signUp = document.getElementById("buttonSignup");
const popFormClose = document.getElementById("popFormClose");

// ---------------- Sign-up-mobile/tablet-declaration ------------------

const signupMobile = document.getElementById("removeSignup");

// ---------------- Pop-up-form-declaration ------------------
const popupForm = document.querySelector(".container__form");

const signupForm = document.getElementById("signUp");
const loginForm = document.getElementById("login");

const nameSignup = document.getElementById("signupFullName");
const emailSignup = document.getElementById("signupEmail");
const passSignup = document.getElementById("signupPassword");
const pass2Signup = document.getElementById("signupPassword2");

const signupName = document.forms.namedItem("formSignup");
const contactName = document.forms.namedItem("formContact");


const linkLogin = document.getElementById("linkLogin");
const linkSignup = document.getElementById("linkSignup");

// ---------------- URL-account-declaration ------------------
const urlAcc = document.getElementById("urlFor");

// ---------------- Navigation-bar-declaration ------------------

const nav = document.querySelector(".container__header-content-navigation");
const searchIcon = document.querySelector("#searchIcon");
const navOpen = document.querySelector(".navOpenBtn");
const navClose = document.querySelector(".navCloseBtn");

// ---------------- Contact-form-declaration ------------------

const contactForm = document.getElementById("contactForm");
const nameContact = document.getElementById("name");
const emailContact = document.getElementById("email");
const messageContact = document.getElementById("message");
const formContactWrap = document.querySelector(".container__contact-wrap");

const arr = [nameContact, emailContact, messageContact];

// ---------------- Form-elements-declaration ------------------

const formEl = [nameSignup, emailSignup, passSignup, pass2Signup];
const contactEl = [nameContact, emailContact, messageContact];

// ---------------- Form-success-declaration ------------------
const registerSuccess = document.querySelector(".container__success");
const successClose = document.getElementById("successClose");
const successTitle = document.querySelector(".container__success-wrap h1");
const successDescription = document.querySelector(".container__success-wrap p");

// ---------------- CSRF token value ------------------

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrfToken = getCookie('csrftoken');


// ---------------- Navigation-bar ------------------

searchIcon.addEventListener("click", () => {
    nav.classList.toggle("open-search")
    if (nav.classList.contains("open-search")) {
        return searchIcon.classList.replace("uil-search", "uil-times");
    }
    searchIcon.classList.replace("uil-times", "uil-search");
})

navOpen.addEventListener("click", () => {
    nav.classList.add("open-nav");
    nav.classList.remove("open-search");
    searchIcon.classList.replace("uil-times", "uil-search");
})

navClose.addEventListener("click", () => {
    nav.classList.remove("open-nav");
});

// ---------------- Contact-form ------------------

for (const iterator of arr) {
    iterator.addEventListener("focus", () => {
        formContactWrap.style.setProperty("border-color", "#2995E2");
    })
    iterator.addEventListener("focusout", () => {
        formContactWrap.style.setProperty("border-color", "#999999");
    })
}

// ---------------- Pop-up-form ==> pop-up ------------------

signUp.addEventListener("click", () => {
    popupForm.classList.remove("container__form-pop");
    document.body.classList.add("model-open")
})

popFormClose.addEventListener("click", () => {
    popupForm.classList.add("container__form-pop");
    document.body.classList.remove("model-open")
})

// ---------------- Pop-up-form ==> background overflow ------------------

signupMobile.addEventListener("click", () => {
    popupForm.classList.remove("container__form-pop");
    document.body.classList.add("model-open")
})

popFormClose.addEventListener("click", () => {
    popupForm.classList.add("container__form-pop");
    document.body.classList.remove("model-open")
})

// ---------------- Pop-up-form ==> sign-up to log-in ------------------

linkLogin.addEventListener("click", e => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    signupForm.classList.add("form--hidden");
})

linkSignup.addEventListener("click", e => {
    e.preventDefault();
    loginForm.classList.add("form--hidden");
    signupForm.classList.remove("form--hidden");
});

// ---------------- Sign-up data send ------------------

signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(signupName);
    const usp = new URLSearchParams();

    for (const items of formData) {
        usp.append(items[0], items[1])
    }

    fetch("signup", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrfToken,
        },
        body: usp,
    })
        .then(response => response.JSON)
        .then(data => {
            console.log(data);
            for (const iterator of formEl) {
                iterator.value = "";
                setTimeout( () => {
                    successTitle.innerHTML = `You registered successfully!`;
                    successDescription.innerHTML = `Please Login to visit your account`;
                    registerSuccess.classList.remove("container__success--hidden")
                    document.body.classList.add("model-open")
                },1000)
                successClose.addEventListener("click", () => {
                    registerSuccess.classList.add("container__success--hidden")
                    document.body.classList.remove("model-open")
                })
            }
        })
        .catch(error => {
            console.error(error);
        });
});


// ---------------- Contact data send ------------------

contactForm.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(contactName);
    const usp = new URLSearchParams();

    for (const items of formData) {
        usp.append(items[0], items[1])
    }

    fetch("contact", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrfToken,
        },
        body: usp,
    })
        .then(response => response.JSON)
        .then(data => {
            console.log(data);
            for (const iterator of contactEl) {
                iterator.value = "";
                setTimeout( () => {
                    const successContact = document.querySelector(".success-contact");
                    successContact.innerHTML = "Message sent successfully!";
                    successContact.style.color = "#2995E2";
                    successContact.classList.remove("success-contact-hidden")
                },1000)
            }
        })
        .catch(error => {
            console.error(error);
        });
});

