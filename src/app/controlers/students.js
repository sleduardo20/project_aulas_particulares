const Students = require('../models/Students')
const {date_nascimento, age, graduation, tipoAula, grade, cargaHoraria} = require ('../../lib/util')


module.exports = {
    index(req, res){
        
        Students.all( (students) =>{
            
            students.hours = cargaHoraria(students.hours)
            return res.render('students/index', { students })
        } )
        
    },

    create(req, res){
        
        return res.render('students/create')
    },

    show(req, res){
        
        Students.find(req.params.id, (student) =>{
            if (!student) return res.send('Student not found')

            student.yearscholl = grade(student.yearscholl)
            student.hours = cargaHoraria(student.hours)

            return res.render('students/show',{ student })
        })
        
        
    },

    post(req, res){

        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key]==""){
                return res.send("Por favor volte e preencha todos os campos!")
            }
        }
        
        Students.create(req.body, (students) =>{
            return res.redirect(`students/`)
        })
    },

    put(req, res){
        
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key]==""){
                return res.send("Por favor volte e preencha todos os campos!")
            }
        }
        
        Students.update(req.body, () =>{
            return res.redirect(`students/${req.body.id}`)
        })
    },

    edit(req, res){
        Students.find(req.params.id, (student) =>{
            if (!student) return res.send('Student not found')

            return res.render('students/edit',{ student })
        })
    },

    delete(req, res){

        Students.delete(req.body.id, () =>{
            return res.redirect(`/`)
        })
    
    }
}

    