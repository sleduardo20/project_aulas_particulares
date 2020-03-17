const db = require('../../config/db')
const {age, date_nascimento, tipoAula, grade, graduation} = require('../../lib/util')

module.exports = {
    all(callback){
        db.query(`
                select t.*, count(s) qtd_alunos
                from teachers t left join
                        students s on t.id = s.id_teacher
                group by t.id
                order by t.id`, 
                (err, results) => {
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

    findBy(filter ,callback){

        db.query(`
        select t.*, count(s) qtd_alunos
        from teachers t left join
                students s on t.id = s.id_teacher
        where t.name ilike '%${filter}%'  or t.area_atuacao ilike '%${filter}%'
        group by t.id
        
        `, (err, results)=>{
            if (err) throw `Database err ${err}`
            callback(results.rows)
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
    },
    pagination(params){
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery="",
            totalQuery=`(select count(*) from teachers)total`

        if(filter){
            filterQuery=`where teachers.name ilike '%${filter}%' or teachers.area_atuacao ilike'%${filter}%'`
            totalQuery = `(select count(*) from teachers 
                          ${filterQuery})total`

        }

        query = `select teachers.*,
                        ${totalQuery},
                        count(students.id)qtd_alunos
                 from teachers left join students on teachers.id = students.id_teacher
                ${filterQuery}
                group by teachers.id
                order by teachers.id
                limit $1 
                offset $2`
        db.query(query,[limit,offset],(err, results)=>{
            if (err) throw `Database err ${err}`
            
            callback(results.rows)
        })

    }

}