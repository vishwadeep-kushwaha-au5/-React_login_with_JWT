const bcrypt = require("bcrypt");

const User = require('../models/User')
const Token = require('../models/Token')
const Helper = require('../utils/helper');
const { loginSchema, registerSchema } = require('../utils/userValidations');


exports.userSignup = async (req, res) => {
    let {email, name, password} = req.body;
    
    //basic validation
    const result = registerSchema.validate({email, name,password})
    if(result.error)
        return res.status(422).json({ error: result.error.details[0].message });

    let user = await User.findOne({email});
    if(user) return res.status(422).json({error: 'User already exists!'});

    
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    password = await bcrypt.hash(password, salt);

    user = new User({email, name, password});
    user.save().then(result=>{
        return res.status(201).json({result: result})
    })
    .catch(error=>res.status(500).json({error:error}));
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    //basic validation
    const result = loginSchema.validate({email,password})
    if(result.error) return res.status(422).json({ error: result.error.details[0].message });

    var user = await User.findOne({email});
    if(!user) return res.status(400).json({ error: 'No user exists with the provided email!' });

    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Invalid Password" });
        //Generate an access token
        const accessToken = Helper.generateAccessToken(user);
        const refreshToken = Helper.generateRefreshToken(user);
        const token = new Token({_id: refreshToken});
        user = user._doc
        delete user.password
        token.save().then(result=>{
            res.status(200).json({result:{...user,
                accessToken,  
                refreshToken,
                }});
        })
        .catch(error=>res.status(500).json({error:error}));
    } else {
      res.status(400).json({error: "Email or password incorrect!"});
    }
}

exports.userDelete = (req, res) => {
    if (req.user.id === req.body.userId || req.user.isAdmin) {
        User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
          res.status(200).json({
            message: "User deleted"
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    } else {
      res.status(403).json({error: "Not Authorized!"});
    }
}

exports.userLogout = (req, res) => {
    const refreshToken = req.body.token;
    if (req.user.id === req.body.userId || req.user.isAdmin) {
        Token.remove({ _id: refreshToken })
        .exec()
        .then(result => {
            res.status(200).json({result: "You logged out successfully."});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    } else {
      res.status(403).json({error: "Not Authorized!"});
    }
}