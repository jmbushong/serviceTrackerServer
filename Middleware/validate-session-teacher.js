const jwt= require('jsonwebtoken');

const Teacher= require('../Db').import('../Models/teacherUser')

module.exports= async (req, res, next) =>{
    const token= req.headers.authorization;

    try{
        const decoded= await jwt.verify(token, process.env.JWT_SECRET)
        console.log('token decoded')
        const user= await Teacher.findOne({where: {classId:decoded.classId}});
        console.log('teacher found')
        if(!user) throw new Error('no user found');
        req.user=user;
        next()
    }catch(err){
        res.status(500).json({error:err})
    }
} 
