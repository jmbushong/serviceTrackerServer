const Sequelize= require('sequelize');

const database= new Sequelize(process.env.NAME, 'postgres', process.env.PASS,{host:
'localhost',
dialect: 'postgres'
})

const ServiceEntry = database.import('./Models/service')
const Teacher = database.import('./Models/teacherUser')
const Student = database.import('./Models/studentUser');

//One to Many
Teacher.hasMany(Student, {foreignKey: "classId"})
Student.belongsTo(Teacher, {foreignKey: "classId"})

//One to Many
Student.hasMany(ServiceEntry)
ServiceEntry.belongsTo(Student)



database.authenticate()
    .then(()=> console.log('postgres db is connected'))
    .catch(err=> console.log(err));

    module.exports=database;