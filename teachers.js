//POST ou Create
const fs = require('fs');
const data = require('./data.json');
const {date,age,graduation,tipoAula} = require ('./util')


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
        tipoAula: tipoAula(foundTeacher.tipoAula)
        

    }
    return res.render('teachers/show',{teacher})
    
    
}

exports.post = function(req,res){
    
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
    
      return res.redirect('/teachers-list')
    })

    
}

exports.edit = function(req,res){
    const {id} = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send ("Teacher não foi encontrado !")

    const teacher = {
        ...foundTeacher,
    }
    
    return res.render('teachers/edit',{teacher})

}

