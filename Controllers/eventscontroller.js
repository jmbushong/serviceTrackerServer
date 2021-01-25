const router= require("express").Router();
const validateSession = require("../Middleware/validate-session");
const validateSessionTeacher= require("../Middleware/validate-session-teacher")
const Events = require("../Db").import("../Models/events");
const Teacher= require('../Db').import('../Models/teacherUser');

//create events
router.post("/", validateSessionTeacher, (req, res) => {
    const events = {
      date: req.body.events.date,
      title:req.body.events.title,
      description: req.body.events.description,
      hours: req.body.events.hours,
      location:req.body.events.location,
      classId: req.user.classId
    
    };
    Events.create(events)
      .then((entry) => res.status(200).json(entry))
      .catch((err) => res.status(500).json({ error: err }));
    });

//updateEvent

    router.put("/:id", validateSessionTeacher, function (req, res) {
    const updateEvent = {
      date: req.body.events.date,
      title:req.body.events.title,
      description: req.body.events.description,
      hours: req.body.events.hours,
      location:req.body.events.location
    
    };
    const query = { where: { id: req.params.id, classId: req.user.classId } };
  
    //req.body.service -- instead of saying I have to have all of the above-- I just want anything that happens to be in that object will be sent
    // req.body.service
  Events.update(req.body.events, query)
      .then((entry) => res.status(200).json(entry))
      .catch((err) => res.status(500).json({ error: err }));
  });


    //   GET ---find all events --later I need to change this so it only grabs events linked to a specific class code
      router.get("/", validateSessionTeacher, function (req, res) {
        console.log(req.user.id)
         return  Events.findAll({where: {classId: req.user.classId}, include: [{model: Teacher}], order: [["date", "ASC"]] }
          )
           .then((userinfo) => res.status(200).json(userinfo))
           .catch((err) => res.status(500).json({ error: err }));
       });

       router.get("/studentview", validateSession, function (req, res) {
        console.log(req.user.id)
         return  Events.findAll({where: {classId: req.user.classId}, include: [{model: Teacher}], 
      order: [["date", "ASC"]]}
          )
           .then((userinfo) => res.status(200).json(userinfo))
           .catch((err) => res.status(500).json({ error: err }));
       });

  
    router.get("/:id", validateSessionTeacher,function (req, res) {
    Events.findOne({
      where: { id: req.params.id, classId: req.user.classId },
      include:[{model: Teacher}],
      order: [["date", "ASC"]]
    })
      .then((profile) => res.status(200).json(profile))
      .catch((err) => res.status(500).json({ error: err }));
  });


router.delete("/:id", validateSessionTeacher, function (req, res) {
  const query = { where: { id: req.params.id } };
  Events.destroy(query)
    .then(() => res.status(200).json({ message: "entry is removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});
     
    module.exports= router