const Teachers = require('../models/Teachers')
const {date_nascimento, age, graduation, tipoAula} = require ('../../lib/util')


module.exports = {
    index(req, res){
        
        Teachers.all( (teachers) =>{
            return res.render('teachers/index', { teachers })
        } )
        
    },

    create(req, res){
        
        return res.render('teachers/create')
    },

    show(req, res){
        
        Teachers.find(req.params.id, (teacher) =>{
            if (!teacher) return res.send('Teacher not found')

            teacher.birth = age(teacher.birth)
            teacher.area_atuacao = teacher.area_atuacao.split(',')


            return res.render('teachers/show',{teacher})
        })
        
        
    },

    post(req, res){

        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key]==""){
                return res.send("Por favor volte e preencha todos os campos!")
            }
        }
        
        Teachers.create(req.body, (teachers) =>{
            return res.redirect(`teachers/`)
        })
    },

    put(req, res){
        
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key]==""){
                return res.send("Por favor volte e preencha todos os campos!")
            }
        }
        
        Teachers.update(req.body, () =>{
            return res.redirect(`teachers/${req.body.id}`)
        })
    },

    edit(req, res){
        Teachers.find(req.params.id, (teacher) =>{
            if (!teacher) return res.send('Teacher not found')

            teacher.birth = date_nascimento(teacher.birth).iso
            teacher.area_atuacao = teacher.area_atuacao.split(',')

            return res.render('teachers/edit',{teacher})
        })
    },

    delete(req, res){

        Teachers.delete(req.body.id, () =>{
            return res.redirect(`/`)
        })
    
    }
}

    