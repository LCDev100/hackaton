const sabiController = {};
const axios = require('axios');

sabiController.get = async (req, res) => {      
    res.status(200).json({
        "message": "Hello, I'm Sabi"
    });
};

sabiController.post = async (req, res) => {
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
};

module.exports = sabiController;