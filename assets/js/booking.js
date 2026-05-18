const bookingPopup = document.getElementById("bookingPopup");

const openPopupBtns = document.querySelectorAll(".open-booking-popup");

const closePopupBtn = document.getElementById("closePopup");

const bookingForm = document.getElementById("bookingForm");

const successPopup = document.getElementById("successPopup");

const closeSuccessPopup = document.getElementById("closeSuccessPopup");

const submitBookingBtn = document.getElementById("submitBooking");


// ========================================
// OPEN BOOKING POPUP
// ========================================

openPopupBtns.forEach((btn)=>{

    btn.addEventListener("click", ()=>{

        bookingPopup.classList.add("active");

    });

});


// ========================================
// CLOSE BOOKING POPUP
// ========================================

closePopupBtn.addEventListener("click", ()=>{

    bookingPopup.classList.remove("active");

});


// ========================================
// CLOSE BOOKING POPUP OUTSIDE CLICK
// ========================================

bookingPopup.addEventListener("click", (e)=>{

    if(e.target === bookingPopup){

        bookingPopup.classList.remove("active");

    }

});


// ========================================
// SUBMIT BOOKING
// ========================================

submitBookingBtn.addEventListener("click", ()=>{

    const bookingData = {

        full_name: document.getElementById("fullName").value,

        phone_number: document.getElementById("phoneNumber").value,

        living_city: document.getElementById("livingCity").value,

        members: parseInt(document.getElementById("members").value),

        checkin_date: document.getElementById("checkinDate").value

    };


    // ========================================
    // VALIDATION
    // ========================================

    if(
        !bookingData.full_name ||
        !bookingData.phone_number ||
        !bookingData.living_city ||
        !bookingData.members ||
        !bookingData.checkin_date
    ){

        alert("Please fill all fields.");

        return;

    }


    // ========================================
    // SHOW SUCCESS POPUP FIRST
    // ========================================

    bookingForm.reset();

    bookingPopup.classList.remove("active");

    successPopup.classList.add("active");


    // ========================================
    // SAVE BOOKING IN BACKGROUND
    // ========================================

    fetch(
        "http://127.0.0.1:8000/api/book-stay",
        {
            method: "POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(bookingData)
        }
    )

    .then(()=>{

        console.log("Booking Saved Successfully");

    })

    .catch((error)=>{

        console.error("Booking Save Failed:", error);

    });

});


// ========================================
// CLOSE SUCCESS POPUP
// ========================================

closeSuccessPopup.addEventListener("click", ()=>{

    successPopup.classList.remove("active");

});