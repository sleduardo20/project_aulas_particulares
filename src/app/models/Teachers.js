const db = require('../../config/db')
const {age, date_nascimento, tipoAula, grade, graduation} = require('../../lib/util')

module.exports = {
    all(callback){
        db.query(`select * from teachers`, (err, results) => {
            if (err) throw `Database err ${err}`

            callback(results.rows)
        })
    },

    create(data, callback){

        const query = `insert into teachers (
            avatar_url,
            name,
            birth,
            escolaridade,
            tipo_aula,
            area_atuacao
        ) values ( $1, $2, $3, $4, $5, $6) returning id`
        
        const values = [
            data.avatar_url,
            data.name,
            date_nascimento(data.birth).iso,
            graduation(data.escolaridade),
            tipoAula(data.tipo_aula),
            data.area_atuacao
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database err ${err}`
            
            callback(results.rows[0])
        })
    
    },

    find(id, callback){
        const query = `select * from teachers where id = $1`
        
        db.query(query,[id], (err, results) =>{
            if (err) throw `Database err ${err}`
            callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `update teachers set 
                       avatar_url = $1,                
                       name = $2,                
                       birth = $3,                
                       escolaridade = $4, 
                       tipo_aula = $5,                
                       area_atuacao = $6
                       where id = $7
                        `
        
        const values = [
            data.avatar_url,
            data.name,
            date_nascimento(data.birth).iso,
            data.escolaridade,
            tipoAula(data.tipo_aula),
            data.area_atuacao,
            data.id
        ]
        
        db.query( query, values, (err, results) =>{
            if (err) throw `Database err ${err}`

            callback()
        })
    },

    delete(id, callback){
        db.query(`delete from teachers where id= $1`, [id], (err, results) =>{
            if (err) throw `Database err ${err}`
             return callback()
        })
    }

}