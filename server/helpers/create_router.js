//import express and mongo
const express = require('express');
const ObjectID = require('mongodb').ObjectID;

//createRouter func hold all the routes
//collection is like placeholder (booking collection)
const createRouter = function(collection){
    //define router
    const router = express.Router();

    //crud func
    //INDEX - get request
    //we use mongo provided methods for CRUD (find())
    //comming as promise obj we should turn in json obj
    //INDEX
    router.get('/', (req, res) => {
        collection
        .find()
        .toArray()
        .then((docs) => res.json(docs))
        .catch((err) => {
          console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
        });
      });
      //SHOW ..ID
      //get id from url use params
      //give to findOne id object (no is as string)
      router.get('/:id', (req, res) => {
        const id = req.params.id;
        collection
        .findOne({ _id: ObjectID(id) })
        .then((doc) => res.json(doc))
        .catch((err) => {
          console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
        });
      });

      //CREATE POST
      //get data from req.body..use insertOne to fill up collection
      router.post('/', (req, res) => {
        const newData = req.body;
        collection
        .insertOne(newData)
        .then((result) => {
          res.json(result.ops[0])
        })
        .catch((err) => {
          console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
        });
      });
      //edit
      router.put('/:id', (req, res) => {
        const id = req.params.id;
        const updatedData = req.body;
        collection
        //get two arg (id, newData)
        .updateOne(
          { _id: ObjectID(id)},
          { $set: updatedData }
        )
        .then((result) => {
          res.json(result)
        })
        .catch((err) => {
          console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
        });
      })

      //DESTROY DELETE
      router.delete('/:id', (req, res) => {
        const id = req.params.id;
        collection
        .deleteOne({ _id: ObjectID(id) })
        .then(result => {
          res.json(result)
        })
        .catch((err) => {
          console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
        });
      });


      return router;



}
module.exports = createRouter;
