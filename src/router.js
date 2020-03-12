const express = require('express');
const router = express.Router()
const teachers = require('./app/controlers/teachers');
const students = require('./app/controlers/students');


router.get('/', (req,res) => {
    return    res.redirect("/teachers")
} )

router.get('/teachers',teachers.index);
router.get('/teachers/create',teachers.create);
router.get('/teachers/:id',teachers.show);
router.get('/teachers/:id/edit',teachers.edit);
router.post('/teachers',teachers.post);
router.put('/teachers',teachers.put);
router.delete('/teachers',teachers.delete);


router.get('/students',students.index);
router.get('/students/create',students.create);
router.get('/students/:id',students.show)
router.get('/students/:id/edit',students.edit)
router.post('/students',students.post)
router.put('/students',students.put)
router.delete('/students',students.delete)


module.exports = router;