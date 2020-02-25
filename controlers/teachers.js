//POST ou Create
const fs = require('fs');
const data = require('../data.json');
const {date_nascimento, age, graduation, tipoAula} = require ('../util')


exports.index = (req,res) => {
    return res.render('teachers/index', { teachers: data.teachers } )
}

exports.show = (req,res) => {
const {id} = req.params

    const foundTeacher = data.teachers.find((teacher)=>{
        return teacher.id == id
    })

    if (!foundTeacher) return res.send ("Teacher não foi encontrado !")

    const teacher = {
        ...foundTeacher,
        dt_nascimento: age(foundTeacher.dt_nascimento),
        Escolaridade: graduation(foundTeacher.Escolaridade),
        tipoAula: 'Presencial'
        

    }
    return res.render('teachers/show',{teacher})
    
    
}

exports.create = (req,res) => {
    return res.render('teachers/create')
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
    let {avatar_url, Name, dt_nascimento, Escolaridade, tipoaula, atuacao} = req.body 
    
    //criando um id para podermos buscar futuramente no banco de dados
    const id = Number (data.teachers.length + 1)
    dt_nascimento = Date.parse(dt_nascimento)


    
    //adicionando os dados em um array teachers
    data.teachers.push({
        id,
        Name,
        avatar_url,
        dt_nascimento,
        Escolaridade,
        tipoaula,
        atuacao
    })
    
    //funçao para escrever os dados em um arquivo Json
    fs.writeFile("data.json",JSON.stringify(data, null, 2),function(erro){
      if (erro)  res.send("Erro verifique o problema na pagina anterior")
    
      return res.redirect('/teachers')
    })

    
}

exports.edit = (req,res) => {
    const {id} = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send ("Teacher não foi encontrado !")

    
    const teacher = {
        ...foundTeacher,
        dt_nascimento: date_nascimento(foundTeacher.dt_nascimento).iso,
        Escolaridade: graduation(foundTeacher.Escolaridade),
        
        
    }
    
    return res.render('teachers/edit',{teacher})

}

exports.put = (req,res) =>{
    const {id} = req.body
    let index = 0

    const foundTeacher = data.teachers.find((teacher,foundIndex)=>{
        if ( teacher.id == id){
            index= foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send ("Teacher não foi encontrado !")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        dt_nascimento: Date.parse(req.body.dt_nascimento),
        
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json',JSON.stringify(data, null, 2), (err) =>{
        if(err) return res.send ("write err")
        return res.redirect(`/`)
    })

}

exports.delete = (req,res)=>{
    const { id } = req.body

    filterTeachers = data.teachers.filter((teacher)=>{
        return teacher.id != id
    })

    data.teachers = filterTeachers

    fs.writeFile('data.json',JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Err in write!")
        return res.redirect('/teachers')
    })
}
