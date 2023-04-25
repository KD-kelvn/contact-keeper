const express = require('express');
const router = express.Router();

// @route   GET /api/contacts
// @desc    get all contacts 
// @access  private
router.get('/', ((req, res)=>res.send("Get all contacts")));

// @route   POST /api/contacts
// @desc    add new contacts 
// @access  private
router.post('/', ((req, res)=>res.send("Add new contacts")));
// @route   PUT /api/contacts/:id
// @desc    update an existing contact 
// @access  private
router.put('/:id', ((req, res)=>res.send("update an existing contact")));
// @route   DELETE /api/contacts/:id
// @desc    remove an existing contact
// @access   private
router.delete('/:id', ((req, res)=>res.send("Remove an existing contact")));
module.exports = router;