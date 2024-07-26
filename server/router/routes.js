const express = require('express');
const router = express.Router();

const {getPostList, getPostContent} = require('../handlers/postHandler');
const getList = require('../handlers/listHandler');

router.get('/main', getPostList);
router.get('/main_content', getPostContent);
router.get('/my_list', getList);

module.exports = router;