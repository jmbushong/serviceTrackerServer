const Sequelize= require('sequelize');

const database= new Sequelize(process.env.NAME, 'postgres', process.env.PASS,{host:
'localhost',
dialect: 'postgres'
})

database.authenticate()
    .then(()=> console.log('postgres db is connected'))
    .catch(err=> console.log(err));

    module.exports=database;