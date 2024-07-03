const express = require('express');
const router = express.Router();

const {getPostList, getPostContent} = require('../handlers/postHandler');

router.get('/main', getPostList);
router.get('/main_content', getPostContent);

module.exports = router;