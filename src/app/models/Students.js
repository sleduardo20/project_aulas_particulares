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
            hours,
            id_teacher
            
        ) values ( $1, $2, $3, $4, $5, $6 ) returning id`
        
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.yearscholl,
            data.hours,
            data.teachers

        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database err ${err}`
            
            callback(results.rows[0])
        })
    
    },

    find(id, callback){
        const query = `select s.*, t.name name_teacher
                       from teachers t join
                            students s on t.id = s.id_teacher 
                       where s.id = $1`
        
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
    },

    optionTeachers(callback){
        db.query(`select id, name 
                  from teachers`, (err, results) =>{
            if (err) throw `Database err ${err}`
            callback(results.rows)
        })
    },
    pagination(params){
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery="",
            totalQuery=`(select count(*) from students)total`

        if(filter){
            filterQuery=`where students.name ilike '%${filter}%' or students.area_atuacao ilike'%${filter}%'`
            totalQuery = `(select count(*) from students 
                          ${filterQuery})total`

        }

        query = `select students.*,
                        ${totalQuery}
                 from students 
                ${filterQuery}
                group by students.id
                order by students.id
                limit $1 
                offset $2`
        db.query(query,[limit,offset],(err, results)=>{
            if (err) throw `Database err ${err}`
            
            callback(results.rows)
        })

    }

}