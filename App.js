require('dotenv').config()
const Express= require('express')
const app= Express();


app.get('/', (req, res)=> res.render('index'));

const database=require('./Db');
database.sync();
app.use(Express.json());

app.use(require('./middleware/headers'))

const user= require('./Controllers/usercontroller');
app.use('/user', user)

const teacherUser= require('./Controllers/teachercontroller')
app.use('/teacheruser', teacherUser);

const events= require('./Controllers/eventscontroller')
app.use('/events', events);

const service= require('./Controllers/servicecontroller')
app.use('/service', service);





app.listen(process.env.PORT, ()=>console.log(`App is listening on ${process.env.PORT}`))





