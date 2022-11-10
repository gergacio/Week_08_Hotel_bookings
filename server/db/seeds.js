//create database, create collection
use hotel_booking;
db.dropDatabase();

db.bookings.insertMany([
    {
        guest_name: "Peter Parker",
        guest_email: "d_man@spider.com",
        cheked_in: true
    },
    {
        guest_name: "Tony Stark",
        guest_email: "tony@stark_industries.io",
        cheked_in: true
    }
]);