const router= require("express").Router();
const validateSession = require("../middleware/validate-session");
const validateSessionTeacher= require("../Middleware/validate-session-teacher")
const Events = require("../Db").import("../Models/events");

//create events
router.post("/", validateSessionTeacher, (req, res) => {
    const events = {
      date: req.body.events.date,
      title:req.body.events.title,
      description: req.body.events.description,
      hours: req.body.events.hours,
      location:req.body.events.location,
    
    };
    Events.create(events)
      .then((entry) => res.status(200).json(entry))
      .catch((err) => res.status(500).json({ error: err }));
    });

    //   GET ---find all events --later I need to change this so it only grabs events linked to a specific class code
      router.get("/", validateSessionTeacher, function (req, res) {
        console.log(req.user.id)
         return  Events.findAll(
          )
           .then((userinfo) => res.status(200).json(userinfo))
           .catch((err) => res.status(500).json({ error: err }));
       });

       router.get("/studentview", validateSession, function (req, res) {
        console.log(req.user.id)
         return  Events.findAll(
          )
           .then((userinfo) => res.status(200).json(userinfo))
           .catch((err) => res.status(500).json({ error: err }));
       });

  
router.delete("/:id", validateSessionTeacher, function (req, res) {
  const query = { where: { id: req.params.id } };
  Events.destroy(query)
    .then(() => res.status(200).json({ message: "entry is removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});
     
    module.exports= router