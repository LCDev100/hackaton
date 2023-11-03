const nickNameController = {};
const nickName = require('../models/nickname');

nickNameController.get = async (req, res) => {      
    res.status(200).json({
        "message": "Hello, I'm Sabi"
    });
};

nickNameController.registrar = async (req, res) => {      
    try {
        const nicknameNuevo = req.body.nickname;
        var foundNickname = await nickName.findOne({nickname: nicknameNuevo})
        if(foundNickname==null){
            const newNickname = new nickName({
            nickname: nicknameNuevo
            })
            const savedNickname = await newNickname.save()
            res.status(200).json({ 
                "message": "Nickname registrado",
                "response": savedNickname.nickname
            });
        }else{
            // Recomendación de nickname
            const horaActual = (new Date()).toLocaleTimeString().replace(/:/g, '');
            console.log((new Date()).toLocaleTimeString());
            var sugerencia = nicknameNuevo + fechaYHoraActual;
            while(foundNickname!=null){
                foundNickname = await nickName.findOne({nickname: sugerencia})
                if(foundNickname!=null){
                    sugerencia = sugerencia + "1";
                }
            }
            res.status(400).json({ 
                "message": "Nickname ya existe",
                "sugerencia": sugerencia
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Hubo un error'})
    }
};

nickNameController.buscar = async(req, res) =>{
    try {
        const nickname = req.body.nickname;
        var foundNickname = await nickName.findOne({nickname: nickname})
        if(foundNickname!=null){
            res.status(200).json({ 
                "message": "Nickname encontrado",
                "response": foundNickname.nickname
            });
        }else{
            res.status(400).json({ 
                "message": "Nickname no encontrado",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Hubo un error'})
    }
}

module.exports = nickNameController;