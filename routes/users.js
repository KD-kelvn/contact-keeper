const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config =  require('config');
const User = require('../models/User');
const router = express.Router();

// @route   POST /api/users
// @desc    register a user
// @access   public
router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid Email').isEmail(),
    check('password', 'Please enter a password with a 6 or more characters').isLength({
        min: 6
    })
],  ( async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    else{
        try {
            const { name, email, password} = req.body;
            let user = await User.findOne({ email}, null, {timeout: 40000});

            if(user){
                return res.status(400).json({msg: "!Sorry, User already exists"})
            }
            user = new User({ name: name, email: email, password: password});
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            // res.send('User saved!');
            const payload = {
                user: {
                    id: user.id,
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            }, (err, token)=> {
                if(err) throw err;
                res.json({ token });
            });
        } catch (error) {
            // console.error(error.message);
            res.status(500).send('server error')
        }  
    }
    
})
);
module.exports = router;