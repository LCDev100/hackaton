const sabiController = {};
const axios = require('axios');
const chatModel = require('../models/chat');

sabiController.get = async (req, res) => {      
    res.status(200).json({
        "message": "Hello, I'm Sabi"
    });
};

sabiController.consultar = async (req, res) => {
    try {
        const data = {
            role: req.body.role,
            content: req.body.content
        };
        axios.post('https://basicgptapi.azurewebsites.net/message/user', data)
            .then(response => {
                res.status(200).json(response.data)
                // console.log(response.data);
            })
            .catch(error => {
                res.status(503).json(error)
                console.error('Error posting data:', error);
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Hubo un error'})
    }
};

sabiController.consultarYRegistrarChat = async (req, res) => {
    try {
        // const roleChatNuevo = req.body.nickname;  
        const inputChatNuevo = req.body.content; 
        const data = {
            role: 'user',
            content: inputChatNuevo
        };
        axios.post('https://basicgptapi.azurewebsites.net/message/user', data)
            .then(async response => { // Hacer la función de callback asíncrona
                const outputChatNuevo = response.data.response.content;
                const nicknameChatNuevo = req.body.nickname;
                const temaChatNuevo = req.body.tema;
                const fechaYHoraChatNuevo = (new Date()).toString()
                try {
                    const newChat = new chatModel({
                        input: inputChatNuevo,
                        output: outputChatNuevo,
                        nickname: nicknameChatNuevo,
                        tema: temaChatNuevo,
                        fechayhora: fechaYHoraChatNuevo
                    })
                    const savedChat = await newChat.save()
                    res.status(200).json({ 
                        "message": "Chat registrado",
                        "response": savedChat.output
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).json({message: 'Hubo un error'})
                }
            })
            .catch(error => {
                res.status(503).json(error)
                console.error('Error posting data:', error);
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Hubo un error'})
    }
};

sabiController.consultarYRegistrarChatConContexto = async (req, res) => {
    try {
        const nicknameChatNuevo = req.body.nickname;
        const inputChatNuevo = req.body.content;
        if(nicknameChatNuevo!="user"){ // Con Contexto
            // Obtener todos los chats anteriores para tener un contexto
            const documents = await chatModel.find({ nickname: nicknameChatNuevo });
            //Añadir Contexto
            const contexto = "MENSAJE:" + inputChatNuevo + "\n\n"
            + "Acontinuación te envío todo un objeto JSON con chats que hemos tenido anteriormente. "
            + "Donde input es el mensaje que yo te envie, el output es la respuesta que tu me diste, "
            + "el nickname es mi nickname, el tema es sobre la categoría de la conversación a grandes rasgos, "
            + "y la fechayhora es la fecha y hora en la que se realizo la conversación.\n" 
            + "Utilizalo para obtener información y tener un contexto y "
            + "así poder darme una respuesta más especifica al MENSAJE que te di anteriormente. "
            + "Pero dentro de tus respuestas no me menciones que estas utilizando este contexto que yo te proporcione.\n\n"
            + "MI NICKNAME ES: " + nicknameChatNuevo + "\n\n"
            + "MI CONTEXTO ES: \n" + documents.toString();
            const data = {
                role: 'user',
                content: contexto
            };
            axios.post('https://basicgptapi.azurewebsites.net/message/user', data)
            .then(async response => { // Hacer la función de callback asíncrona
                const outputChatNuevo = response.data.response.content;
                const nicknameChatNuevo = req.body.nickname;
                const temaChatNuevo = req.body.tema;
                const fechaYHoraChatNuevo = (new Date()).toString()
                try {
                    const newChat = new chatModel({
                        input: inputChatNuevo,
                        output: outputChatNuevo,
                        nickname: nicknameChatNuevo,
                        tema: temaChatNuevo,
                        fechayhora: fechaYHoraChatNuevo
                    })
                    const savedChat = await newChat.save()
                    res.status(200).json({ 
                        "message": "Chat registrado",
                        "response": savedChat.output
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).json({message: 'Hubo un error'})
                }
            })
            .catch(error => {
                res.status(503).json(error)
                console.error('Error posting data:', error);
            });
        } else { // Sin Contexto
            await sabiController.consultarYRegistrarChat(req, res);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Hubo un error'})
    }  
};

sabiController.consultarChats = async (req, res) => {      
    try {
        const documents = await chatModel.find({ nickname: req.body.nickname });
        res.status(200).json({ 
            "chats": documents
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Hubo un error'})
    }
};

module.exports = sabiController;