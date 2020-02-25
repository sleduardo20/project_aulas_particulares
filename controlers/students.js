//POST ou Create
const fs = require('fs');
const data = require('../data.json');
const {date_nascimento, age, graduation, tipoAula, grade, cargaHoraria} = require ('../util')


exports.index = (req,res) => {

    return res.render('students/index', {students: data.students} )
}

exports.show = (req,res) => {
const {id} = req.params

    const foundStudent = data.students.find((student)=>{
        return student.id == id
    })

    if (!foundStudent) return res.send ("Student não foi encontrado !")

    const student = {
        ...foundStudent,
        yearScholl: grade(foundStudent.yearScholl)
    }
    
    return res.render('students/show',{student})
}

exports.create = (req,res) => {
    return res.render('students/create')
}

exports.post = (req,res) => {
    
    //capturando a chave de cada input
    const keys = Object.keys(req.body)
    
    //percorrendo as chaves e verificando de algum campo esta vazio
    for(key of keys){
        if(req.body[key]==""){
            return res.send("Por favor volte e preencha todos os campos!")
        }
    }

    //desestruturando o req.body para sabermos o que estamos buscando
    
    
    //criando um id para podermos buscar futuramente no banco de dados
    let id = 1
    const lastStudent = data.students[data.students.length -1]
    if(lastStudent){
        id = lastStudent.id + 1
    }
    
    //adicionando os dados em um array students
    data.students.push({
        id,
        ...req.body,
        hours: Number(req.body.hours)

    })
    
    //funçao para escrever os dados em um arquivo Json
    fs.writeFile("data.json",JSON.stringify(data, null, 2),function(erro){
      if (erro)  res.send("Erro verifique o problema na pagina anterior")
    
      return res.redirect('/students')
    })

    
}

exports.edit = (req,res) => {
    const {id} = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send ("Student não foi encontrado !")

    
    const student = {
        ...foundStudent
    }
    
    return res.render('students/edit',{student})

}

exports.put = (req,res) =>{
    const {id} = req.body
    let index = 0

    const foundStudent = data.students.find((student,foundIndex)=>{
        if ( student.id == id){
            index= foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send ("Student não foi encontrado !")

    const student = {
        ...foundStudent,
        ...req.body
        }

    data.students[index] = student

    fs.writeFile('data.json',JSON.stringify(data, null, 2), (err) =>{
        if(err) return res.send ("write err")
        return res.redirect(`/students`)
    })

}

exports.delete = (req,res)=>{
    const { id } = req.body

    filterStudents = data.students.filter((student)=>{
        return student.id != id
    })

    data.students = filterStudents

    fs.writeFile('data.json',JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Err in write!")
        return res.redirect('/students')
    })
}
