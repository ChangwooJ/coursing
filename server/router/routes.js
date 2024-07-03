const express = require('express');
const router = express.Router();

const getPostList = require('../handlers/postHandler');

router.get('/main', getPostList);

module.exports = router;