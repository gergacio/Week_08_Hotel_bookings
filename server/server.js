//import express, cors, mongo
const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router.js");

const app = express();

//middleware func
app.use(express.json())//post request
app.use(cors());//share domains

//mongo ..mongoClientDB
//client -- ref to database
MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true }, (err, client) => {
  if(err){
    console.log(err);
  }

  const db = client.db('hotel_booking');
  const bookingsCollection = db.collection('bookings');
  const bookingsRouter = createRouter(bookingsCollection);

  app.use('/api/bookings', bookingsRouter);

  app.listen(9000, function(){
    console.log(`app listening on port ${this.address().port}`);
  })
})
