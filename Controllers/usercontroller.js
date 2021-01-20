const router = require("express").Router();
const User = require("../Db").import("../Models/studentUser");
const teacherUser = require("../Db").import("../Models/teacherUser");
const Service = require("../Db").import("../Models/service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../Middleware/validate-session");
const validateSessionTeacher = require("../Middleware/validate-session-teacher");

router.post("/signup", (req, res) => {
  User.create({
    firstName: req.body.studentUser.firstName,
    lastName: req.body.studentUser.lastName,
    email: req.body.studentUser.email,
    password: bcrypt.hashSync(req.body.studentUser.password, 12),
    classId: req.body.studentUser.classId,
  })
    .then((studentUser) => {
      const token = jwt.sign({ id: studentUser.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({
        user: studentUser,
        message: "user was created successfully",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).send(err));
});

//login
router.post("/login", (req, res) => {
  User.findOne({
    where: { email: req.body.studentUser.email },
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(
          req.body.studentUser.password,
          user.password,
          (err, matches) => {
            if (matches) {
              const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
              });
              res.status(200).json({
                user: user,
                message: "successfully authenticated",
                sessionToken: token,
              });
            } else {
              res.status(502).json({ error: "password mismatch" });
            }
          }
        );
      } else {
        res.status(500).json({ error: "user not found" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//GET '/' --- Gets all users (eventually add validateSession when connected to teacher)
router.get("/all", validateSessionTeacher, function (req, res) {
  return User.findAll({
    where: { classId: req.user.classId },
    include: [{ model: teacherUser }, { model: Service }],
    order: [["firstName", "ASC"]]
  })
    .then((userinfo) => res.status(200).json(userinfo))
    .catch((err) => res.status(500).json({ error: err }));
});


//GET '/:id' --- Gets all users (eventually add validateSession when connected to teacher)
router.get("/:id", validateSessionTeacher, function (req, res) {
    return User.findOne({
      where: {id: req.params.id, classId: req.user.classId },
      include: [{ model: teacherUser }, { model: Service }],
      order: [["firstName", "ASC"]]
    })
      .then((userinfo) => res.status(200).json(userinfo))
      .catch((err) => res.status(500).json({ error: err }));
  });

//Update User Info By ID --- I want a user & teacher to be able to do this
router.put("/:id", validateSessionTeacher, function (req, res) {
  const updateUserInfo = {
    firstName: req.body.studentUser.firstName,
    lastName: req.body.studentUser.lastName,
    email: req.body.studentUser.email,
    // password: bcrypt.hashSync(req.body.studentUser.password, 12),
  };

if(req.body.studentUser.password){  updateUserInfo.password= bcrypt.hashSync(req.body.studentUser.password, 12)}

  const query = {
    where: { id: req.params.id, classId: req.user.classId },
    include: [{ model: User }],
  };

  User.update(updateUserInfo, query)
    .then((userinfo) => res.status(200).json(userinfo))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete", validateSession, function (req, res) {
  const query = { where: { id: req.user.id } };
  User.destroy(query)
    .then(() => res.status(200).json({ message: "user is removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

//   router.delete("/:id", validateSessionTeacher, function (req, res) {
//     const query = { where: {id: req.params.id} };
//     User.destroy(query)
//       .then(() => res.status(200).json({ message: "student user is removed" }))
//       .catch((err) => res.status(500).json({ error: err }));
//   });

router.delete("/:id", validateSessionTeacher, function (req, res) {
  const query = { where: { id: req.params.id }, include: [{ model: User }] };
  User.destroy(query)
    .then(() => res.status(200).json({ message: "student user is removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
