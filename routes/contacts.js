const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route   GET /api/contacts
// @desc    get all contacts 
// @access  private
router.get('/', auth, (async (req, res)=>{
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
}));

// @route   POST /api/contacts
// @desc    add new contacts 
// @access  private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]], (async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorArray =  errors.array();
        return res.status(400).json({msg: errorArray[0].msg});
    }
    try {
        const {name, email, phone, type } = req.body;
        const newContact = new Contact({name, email, phone, type, user:req.user.id});
        const contact = await newContact.save();
        res.json({newContact: contact, status: 'success'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
   
}));
// @route   PUT /api/contacts/:id
// @desc    update an existing contact 
// @access  private
router.put('/:id',auth, ( async (req, res)=>{
    const { name, email, phone, type } = req.body;
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;
    console.log(contactFields.name)
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact){
            return res.status(404).json({msg: "Contact not found"});
        }

        // make sure user own the contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: "Access denied"});
        }
        contact = await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields}, {new:true});
        res.json(contact);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
}));
// @route   DELETE /api/contacts/:id
// @desc    remove an existing contact
// @access   private
router.delete('/:id',auth, (async (req, res)=>{
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact){
            return res.status(404).json({msg: "Contact not found"});
        }

        // make sure user own the contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: "Access denied"});
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.json({msg: 'Contact removed successfully'});

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
}));
module.exports = router;