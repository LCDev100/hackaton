const apiSabiController = {};

apiSabiController.get = async (req, res) => {      
    res.status(200).json({
        "message": "Hello, I'm Sabi"
    });
};

module.exports = apiSabiController;