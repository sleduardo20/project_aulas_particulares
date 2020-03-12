const db = require('../../config/db')
const {age, date_nascimento, tipoAula, grade, graduation} = require('../../lib/util')

module.exports = {
    all(callback){
        db.query(`select * from students`, (err, results) => {
            if (err) throw `Database err ${err}`

            callback(results.rows)
        })
    },

    create(data, callback){

        const query = `insert into students (
            avatar_url,
            name,
            email,
            yearscholl,
            hours
            
        ) values ( $1, $2, $3, $4, $5 ) returning id`
        
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.yearscholl,
            data.hours,

        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database err ${err}`
            
            callback(results.rows[0])
        })
    
    },

    find(id, callback){
        const query = `select * from students where id = $1`
        
        db.query(query,[id], (err, results) =>{
            if (err) throw `Database err ${err}`
            callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `update students set 
                       avatar_url = $1,
                       name = $2,
                       email= $3,
                       yearscholl= $4,
                       hours= $5
                       where id = $6
                        `
        
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.yearscholl,
            data.hours,
            data.id
        ]
        
        db.query( query, values, (err, results) =>{
            if (err) throw `Database err ${err}`

            callback()
        })
    },

    delete(id, callback){
        db.query(`delete from students where id= $1`, [id], (err, results) =>{
            if (err) throw `Database err ${err}`
             return callback()
        })
    }

}