module.exports = {
    date_nascimento: (timestamp)=>{
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            year,
            month,
            day,
            iso:`${year}-${month}-${day}`
        }
    },

    age: (dateNiver) =>{
        const today = new Date()

        const niver = new Date(dateNiver)

        let idade = today.getUTCFullYear() - niver.getUTCFullYear()

        const month = today.getUTCMonth() - niver.getUTCMonth()

        if (month < 0 || month == 0 && today.getDate() <= niver.getDate()) {
            idade -=1
        }

        return idade
    },

    graduation: (escolaridade) =>{
        if (escolaridade =='Graduado') {
            return "Graduado"
        }
        else if (escolaridade =='Mestrado'){
            return "Mestrado"
        }

        else{
            return "Doutorado"
        }
        
    },

    tipoAula: (typeAula) =>{
        if (typeAula == "P"){
            return 'Presencial'
        }else{
            return 'A Distância'
        }
    },

    grade: (year) => {
        if (year == '5F'){
            return '5º Ano do Ensino Fundamental'
            } 
        else if (year == '6F'){
            return '6º Ano do Ensino Fundamental'
            } 
        else if (year == '7F'){
            return '7º Ano do Ensino Fundamental'
            } 
        else if (year == '8F'){
            return '8º Ano do Ensino Fundamental'
            } 
        else if (year == '9F'){
            return '9º Ano do Ensino Fundamental'
            } 
        else if (year == '1M'){
            return '1º Ano do Ensino Médio'
            } 
        else if (year == '2M'){
            return '2º Ano do Ensino Médio'
        }else
        return '3º Ano do Ensino Médio'
    },

    cargaHoraria: (hours) => {
        return `${hours} Horas`
    }
}