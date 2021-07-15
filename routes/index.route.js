const express = require('express');
const home = require('./home.route');

const router = express.Router();

router.use('/home', home);

router.get('/', (req, res) => res.send('Node Server'));
router.get('/health', (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        timestamp: Date.now(),
        message: 'OK'
    };
    res.status(200).json(healthcheck);
});

module.exports = router;