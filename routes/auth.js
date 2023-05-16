const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config =  require('config');
const auth = require('../middleware/auth');
const User = require('../models/User');


// @route   POST /api/auth
// @desc    authenticate a logged in user and get a token
// @access   public
router.post('/',[
    check('email', 'Please enter a valid Email').isEmail(),
    check('password', 'Please enter a password with a 6 or more characters').exists()
], (async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorArray =  errors.array();
        return res.status(400).json({msg: errorArray[0].msg});
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
           return res.status(400).json({msg: "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
          return  res.status(400).json({msg: "Invalid credentials"});
        }
        const payload = {
                user: {
                    id: user.id,
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            }, (err, token)=> {
                if(err) throw err;
                res.json({token: token });
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('server error')
        }
   }));
// @route   GET /api/auth
// @desc    get a logged in user
// @access   private
router.get('/', auth,(async(req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user: user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
}));
module.exports = router;