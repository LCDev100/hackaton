const nicknameController = {};
//const nickname = require('./models/nick.name.js');


nicknameController.registrar = async(req, res) =>{
    try {
        const nicknameNuevo = req.body.nickname;
        //Aqui debería buscarlo en la base de datos
        
        /*
        const foundNickname = await nickname.findOne({nickname: nicknameNuevo})
        if(!foundNickname){
            const newNickname = new nickname({
            nickname = nicknameNuevo
            
            })
            const savedNickname = await newNickname.save()
        
        }else{
            //Aqui se debe crear la recomendación de nicknames y responder
        }
        
        */

    } catch (error) {
        console.log(error);
        return res.json({message: 'Hubo un error'})
    }
}

nicknameController.buscar = async(req, res) =>{
    try {
        const nicknameActual = req.body.nickname
        //Aquí se debería buscar el nickname en la base de datos
        /* 
        const foundNickname = await nickname.findOne({nickname: nicknameActual})
        if(!foundNickname){
            console.log('Nickname no existe');
            return res.status(400).json({message: 'El nickname no existe'})
        }
        return res.json({message: 'Nickname correcto!'})
        
        */

    } catch (error) {
        console.log(error)
        return res.json({message: 'Hubo un error'});
    }
}

