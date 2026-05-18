from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles

from fastapi.responses import FileResponse

from pydantic import BaseModel

import json
import os

import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


app = FastAPI()


# =========================================
# STATIC FILES
# =========================================

app.mount("/assets", StaticFiles(directory="assets"), name="assets")


# =========================================
# FRONTEND ROUTE
# =========================================

@app.get("/")

def serve_homepage():

    return FileResponse("index.html")


# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================
# EMAIL CONFIGURATION
# =========================================

SENDER_EMAIL = "dhokareabhi@gmail.com"

APP_PASSWORD = "PUT_NEW_APP_PASSWORD_HERE"

RECEIVER_EMAIL = "dhokareabhi@gmail.com"


# =========================================
# MODEL
# =========================================

class BookingRequest(BaseModel):

    full_name: str
    phone_number: str
    living_city: str
    members: int
    checkin_date: str


# =========================================
# SEND EMAIL
# =========================================

def send_booking_email(data):

    try:

        subject = "New Booking Inquiry - Goveas Stays"

        body = f"""
New Booking Inquiry Received

Full Name: {data['full_name']}

Phone Number: {data['phone_number']}

Living City: {data['living_city']}

Members: {data['members']}

Check-In Date: {data['checkin_date']}
"""


        message = MIMEMultipart()

        message["From"] = SENDER_EMAIL
        message["To"] = RECEIVER_EMAIL
        message["Subject"] = subject

        message.attach(MIMEText(body, "plain"))


        server = smtplib.SMTP("smtp.gmail.com", 587)

        server.starttls()

        server.login(SENDER_EMAIL, APP_PASSWORD)

        server.send_message(message)

        server.quit()

        print("Email Sent Successfully")


    except Exception as error:

        print("Email Sending Failed")
        print(error)


# =========================================
# SAVE BOOKING
# =========================================

@app.post("/api/book-stay")

def save_booking(data: BookingRequest):

    booking_data = data.dict()

    file_path = "data/bookings.json"


    # CREATE DATA FOLDER

    os.makedirs("data", exist_ok=True)


    # CREATE FILE IF NOT EXISTS

    if not os.path.exists(file_path):

        with open(file_path, "w") as file:

            json.dump([], file)


    # LOAD EXISTING DATA

    with open(file_path, "r") as file:

        existing_data = json.load(file)


    # APPEND NEW BOOKING

    existing_data.append(booking_data)


    # SAVE UPDATED DATA

    with open(file_path, "w") as file:

        json.dump(existing_data, file, indent=4)


    # SEND EMAIL

    send_booking_email(booking_data)


    return {
        "success": True,
        "message": "Booking inquiry submitted successfully."
    }