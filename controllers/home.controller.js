const homeService = require('../services/home.service');

const index = function (req, res) {
    res.status(200).json([homeService.index(2)])
}

module.exports = {
    index
};