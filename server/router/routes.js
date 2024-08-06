const express = require('express');
const router = express.Router();

const {getPostList, getPostContent} = require('../handlers/postHandler');
const {getList, postList, deleteList} = require('../handlers/listHandler');
const {postLogin, postLogout} = require('../handlers/authHandler');

router.get('/main', getPostList);
router.get('/main_content', getPostContent);
router.get('/my_list', getList);
router.post('/add_plan', postList);
router.delete('/delete_plan', deleteList);


router.post('/login', postLogin);
router.post('/logout', postLogout);
 

module.exports = router;