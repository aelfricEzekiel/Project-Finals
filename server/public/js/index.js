const togglePassword = () => {
    document.querySelectorAll('.fa-eye-slash').forEach((eye, i) => {
        eye.addEventListener("click", (e) => {
            e.preventDefault();

            if(document.querySelectorAll('#pwd')[i].getAttribute("type") === "password"){
                document.querySelectorAll('#pwd')[i].setAttribute("type", "text");
                eye.classList.add("fa-eye");
                eye.classList.remove("fa-eye-slash");
            } else {
                document.querySelectorAll('#pwd')[i].setAttribute("type", "password");
                eye.classList.remove("fa-eye-slash");
                eye.classList.add("fa-eye");
            }
        })  
    })
}

togglePassword();

const togglePassword2 = () => {
    document.querySelectorAll('.fa-eye-slash').forEach((eye, i) => {
        eye.addEventListener("click", (e) => {
            e.preventDefault();

            if(document.querySelectorAll('#pwd2')[i].getAttribute("type") === "password"){
                document.querySelectorAll('#pwd2')[i].setAttribute("type", "text");
                eye.classList.remove("fa-eye-slash");
                eye.classList.add("fa-eye");
            } else {
                document.querySelectorAll('#pwd2')[i].setAttribute("type", "password");
                eye.classList.add("fa-eye");
                eye.classList.remove("fa-eye-slash");
            }
        })  
    })
}
togglePassword2(); 