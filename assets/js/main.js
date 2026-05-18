const slides = document.querySelectorAll(".villa-slide");

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let currentSlide = 0;


// SHOW SLIDE

function showSlide(index){

    slides.forEach((slide)=>{
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");

}


// NEXT BUTTON

if(nextBtn){

    nextBtn.addEventListener("click", ()=>{

        currentSlide++;

        if(currentSlide >= slides.length){
            currentSlide = 0;
        }

        showSlide(currentSlide);

    });

}


// PREVIOUS BUTTON

if(prevBtn){

    prevBtn.addEventListener("click", ()=>{

        currentSlide--;

        if(currentSlide < 0){
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);

    });

}


// AUTO SLIDER

if(slides.length > 0){

    setInterval(()=>{

        currentSlide++;

        if(currentSlide >= slides.length){
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }, 4000);

}