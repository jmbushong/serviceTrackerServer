const validateSession = require("../middleware/validate-session");
const router = require("express").Router();
const Service = require("../Db").import("../Models/service");
const User= require('../Db').import('../Models/studentUser');

router.post("/", validateSession, (req, res) => {
    const serviceEntries = {
      date: req.body.service.date,
      typeOfService: req.body.service.typeOfService,
      description: req.body.service.description,
      hours: req.body.service.hours,
      status: req.body.service.status,
      studentUserId: req.user.id
    };
    Service.create(serviceEntries)
      .then((entry) => res.status(200).json(entry))
      .catch((err) => res.status(500).json({ error: err }));
    });
  

//   });

//GET '/' --- Pulls up all service entries for individual user (can we make it so the user only creates one?)
router.get("/", validateSession,function (req, res) {
    Service.findAll({
      where: { studentUserId: req.user.id },
      include:[{model: User}],
      order: [["date", "ASC"]]
    })
      .then((profile) => res.status(200).json(profile))
      .catch((err) => res.status(500).json({ error: err }));
  });




    //GET '/' --- Pulls up all service entries (eventually i need to add validateSession back in because this is a security issue. People could view info from postman)
router.get("/all",  function (req, res) {

    return Service.findAll({include: [{model: User}]}  )
      .then((entry) => res.status(200).json(entry))
      .catch((err) => res.status(500).json({ error: err }));
  });

  //GET '/' --- Pulls up all service entries
// router.get("/all", validateSession, function (req, res) {
    // const offset = parseInt(req.query.page) * 5;
    // const limit = 5;
  
    // return Service.findAll({
    //   limit,
    //   offset,
//     })
//       .then((entry) => res.status(200).json(entry))
//       .catch((err) => res.status(500).json({ error: err }));
//   });

  //GET '/id' --- Pulls up  service entries by id for individual user (can we make it so the user only creates one?)
  router.get("/:id", validateSession,function (req, res) {
    Service.findOne({
      where: { id: req.params.id, studentUserId: req.user.id },
      include:[{model: User}],
      order: [["date", "ASC"]]
    })
      .then((profile) => res.status(200).json(profile))
      .catch((err) => res.status(500).json({ error: err }));
  });

router.put("/:id", validateSession, function (req, res) {
    const updateServiceEntries = {
        date: req.body.service.date,
        typeOfService: req.body.service.typeOfService,
        description: req.body.service.description,
        hours: req.body.service.hours,
        status: req.body.service.status,
        studentUserId: req.user.id
    };
    const query = { where: { id: req.params.id, studentUserId: req.user.id } };
  
    //req.body.service -- instead of saying I have to have all of the above-- I just want anything that happens to be in that object will be sent
    // req.body.service
   Service.update(req.body.service, query)
      .then((entry) => res.status(200).json(entry))
      .catch((err) => res.status(500).json({ error: err }));
  });


router.delete("/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, studentUserId: req.user.id } };
    Service.destroy(query)
      .then(() => res.status(200).json({ message: "entry is removed" }))
      .catch((err) => res.status(500).json({ error: err }));
  });
  

  
  module.exports= router