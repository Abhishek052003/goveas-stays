const menuToggle = document.getElementById("menuToggle");

const mobileMenu = document.getElementById("mobileMenu");

const navLinks = document.querySelectorAll("nav a");


// ========================================
// TOGGLE MOBILE MENU
// ========================================

menuToggle.addEventListener("click", ()=>{

    mobileMenu.classList.toggle("active");


    // CHANGE ICON

    if(mobileMenu.classList.contains("active")){

        menuToggle.innerHTML = "✕";

    }

    else{

        menuToggle.innerHTML = "☰";

    }

});


// ========================================
// CLOSE MENU ON LINK CLICK
// ========================================

navLinks.forEach((link)=>{

    link.addEventListener("click", ()=>{

        mobileMenu.classList.remove("active");

        menuToggle.innerHTML = "☰";

    });

});


// ========================================
// CLOSE MENU ON OUTSIDE CLICK
// ========================================

document.addEventListener("click", (e)=>{

    const clickedInsideMenu = mobileMenu.contains(e.target);

    const clickedToggle = menuToggle.contains(e.target);


    if(
        !clickedInsideMenu &&
        !clickedToggle &&
        mobileMenu.classList.contains("active")
    ){

        mobileMenu.classList.remove("active");

        menuToggle.innerHTML = "☰";

    }

});