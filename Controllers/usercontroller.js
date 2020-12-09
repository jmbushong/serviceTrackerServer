const router= require('express').Router();
const User= require('../Db').import('../Models/studentUser');
const jwt= require('jsonwebtoken')
const bcrypt= require('bcryptjs')
// const validateSession=require('../Middleware/validate-session')

router.post('/signup', (req,res) =>{
    User.create({
        firstName: req.body.studentUser.firstName,
        lastName:req.body.studentUser.lastName,
        email:req.body.studentUser.email,
        password:bcrypt.hashSync(req.body.studentUser.password, 12)
    })
    .then(studentUser =>{
        const token= jwt.sign({id:studentUser.id}, process.env.JWT_SECRET, {expiresIn:"7d"})
        res.json({
            user:studentUser,
            message:"user was created successfully",
            sessionToken:token
        })
    }).catch(err =>res.status(500).send(err))
})

module.exports= router;