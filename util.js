module.exports = {
    date: function(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = date.getUTCMonth()
        const day = `0${date.getUTCDay()}`.slice(-2)

        return `${year}-${month}-${day}`
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

    tipoAula: (type) =>{
        (type=='Presencial') ? "Presencial":"Á Distância"
    },


}