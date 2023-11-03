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