
const router= require('express').Router();
const validateSession=require('../Middleware/validate-session-teacher')
const Teacher= require('../Db').import('../Models/teacherUser');
const jwt= require('jsonwebtoken')
const bcrypt= require('bcryptjs');
const User= require('../Db').import('../Models/studentUser');

router.post('/signup', (req,res) =>{
   let randomNumber= Math.floor(1000+Math.random() * 9000)
    Teacher.create({
        firstName: req.body.teacherUser.firstName,
        lastName:req.body.teacherUser.lastName,
        email:req.body.teacherUser.email,
        password:bcrypt.hashSync(req.body.teacherUser.password, 12),
        classId: randomNumber,
        
    })
    .then(teacherUser =>{
        const token= jwt.sign({classId:teacherUser.classId}, process.env.JWT_SECRET, {expiresIn:"7d"})
        res.json({
            teacherUser:teacherUser,
            message:"user was created successfully",
            sessionToken:token
        })
    }).catch(err =>res.status(500).send(err))
})


//login
router.post('/login',  (req, res) =>{

    Teacher.findOne({
        where:{email: req.body.teacherUser.email}
    })
    .then(teacherUser => {
        if(teacherUser){
            
                bcrypt.compare(req.body.teacherUser.password, teacherUser.password, (err, matches) =>{
                    if(matches){
                        const token=jwt.sign({classId:teacherUser.classId},process.env.JWT_SECRET, {expiresIn:"7d"})
                        res.status(200).json({
                            teacherUser:teacherUser,
                            message: "successfully authenticated",
                            sessionToken:token
                        })
                    }else {
                        res.status(502).json({error:'password mismatch'})
                    }
                })
            
        } else {
            res.status(500).json({error:'user not found'});
        }
    })
    .catch(err=> res.status(500).json({error:err}))
})

    //GET '/' --- Gets all users (eventually add validateSession when connected to teacher)
router.get("/all",   function (req, res) {
    console.log(req.originalUrl)
    return Teacher.findAll( {include: [{model: User}]})
      .then((userinfo) => res.status(200).json(userinfo))
      .catch((err) => res.status(500).json({ error: err }));
  });

      //GET ---find all students associated with specific teacher
router.get("/:id", validateSession, function (req, res) {
   
    return  Teacher.findOne(
       { where: { classId: req.params.id} , include: [{model:User}]
    
    }
     )
      .then((userinfo) => res.status(200).json(userinfo))
      .catch((err) => res.status(500).json({ error: err }));
  });


  //Update User Info By ID --- I want a user & teacher to be able to do this
router.put("/:id",  function (req, res) {
    const updateTeacherUserInfo = {
        firstName: req.body.teacherUser.firstName,
        lastName:req.body.teacherUser.lastName,
        email:req.body.teacherUser.email,
        password:bcrypt.hashSync(req.body.teacherUser.password, 12)
    };
    // const query = { where: { classId: req.params.id } }; 
  
   Teacher.update(updateTeacherUserInfo, {where:{ classId: req.params.id } })
      .then((userinfo) => res.status(200).json(userinfo))
      .catch((err) => res.status(500).json({ error: err }));
  });


router.delete("/:id", function (req, res) {
    const query = { where: {  classId: req.params.id } };
    Teacher.destroy(query)
      .then(() => res.status(200).json({ message: "user is removed" }))
      .catch((err) => res.status(500).json({ error: err }));
  });
  




module.exports= router;