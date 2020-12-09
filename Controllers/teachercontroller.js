const router= require('express').Router();
const Teacher= require('../Db').import('../Models/teacherUser');
const jwt= require('jsonwebtoken')
const bcrypt= require('bcryptjs')