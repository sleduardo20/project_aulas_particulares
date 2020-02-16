const express = require('express');
const router = express.Router()
const teachers = require('./teachers');


router.get('/',function(req,res){
    return res.redirect('/teachers/create')
})


router.get('/teachers',function(req,res){
    return res.render('teachers/index')
})

router.get('/teachers/create',function(req,res){
    return res.render('create')
})


router.post('/teachers',teachers.post)


router.get('/teachers-list',function(req,res){
        return res.send('Pagina de Listagem')
})



router.get('/students',function(req,res){
    return res.send('teste')
})



module.exports = router;