// contacts.js
// Benzir Ahmed
// Portfolio Site
// Assignment 2 Authentication - Contact Routes

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the contact model
let contact = require('../models/contacts');

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET contact List page. READ */
router.get('/', requireAuth, (req, res, next) => {
  // find all contacts in the contacts collection
  contact.find((err, contacts) => {
    if (err) {
      return console.error(err);
    }
    else {
      //array.sort, convert every thing to toUpperCase, 
      contacts.sort((x,y) => {
        let nameX = x.Name.toUpperCase();
        let nameY = y.Name.toUpperCase();
        // x is less than y in the alphabet, Andy vs Jon will return -1 
        if(nameX < nameY){
          return -1;
        } 
        // x is greater than y in the alphabet, Ray vs Andy will return +1
        if(nameX > nameY){
          return 1;
        }
        // the two names match 
          return 0;
      });
      res.render('brackets/index', {
        title: 'Brackets',
        contacts: contacts,
        displayName: req.user.displayName
      });
    }
  }); 
});

//  GET the Contact Details page in order to add a new Contact
router.get('/add', requireAuth, (req, res, next) => {
  res.render('brackets/details', {
    title: "Add a Contact",
    contacts: '',
    displayName: req.user.displayName
  });
});

// POST process the Contact Details page and create a new Contact - CREATE
router.post('/add', requireAuth, (req, res, next) => {
  let newcontact = contact({
    "Name": req.body.name,
    "Phone": req.body.phone,
    "Email": req.body.email
  });

  contact.create(newcontact, (err, contacts) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/brackets');
    }
  });
});

// GET the Contact Details page in order to edit an existing Contact
router.get('/:id', requireAuth, (req, res, next) => {
  try {
    // get a reference to the id from the url
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

    // find one contact by its id
    contact.findById(id, (err, contacts) => {
      if (err) {
        console.log(err);
        res.end(error);
      } else {
        // show the contact details view
        res.render('brackets/details', {
          title: 'Contact Details',
          contacts: contacts,
          displayName: req.user.displayName
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.redirect('/errors/404');
  }
});

// POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {

  // get a reference to the id from the url
  let id = req.params.id;

  let updatedcontact = contact({
    "_id": id,
    "Name": req.body.name,
    "Phone": req.body.phone,
    "Email": req.body.email
  });

  contact.update({ _id: id }, updatedcontact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the contact List
      res.redirect('/brackets');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', requireAuth, (req, res, next) => {

  // get a reference to the id from the url
  let id = req.params.id;

  contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the contact list
      res.redirect('/brackets');
    }
  });

});

module.exports = router;