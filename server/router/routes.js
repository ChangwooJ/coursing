const express = require('express');
const router = express.Router();

const {getPostList, getPostContent} = require('../handlers/postHandler');
const {getList, postList, deleteList, getTitle} = require('../handlers/listHandler');
const {postLogin, postLogout, getLogged} = require('../handlers/authHandler');
const getUCList = require('../handlers/user_categoryHandler');
const getPCList = require('../handlers/post_categoryHandler');

router.get('/main', getPostList);
router.get('/main_content', getPostContent);
router.get('/my_list', getList);
router.get('/title', getTitle);
router.get('/UC/:user_id', getUCList);
router.get('/PC', getPCList);
router.post('/add_plan', postList);
router.delete('/delete_plan', deleteList);

router.post('/login', postLogin);
router.post('/logout', postLogout);
router.get('/status', getLogged);

module.exports = router;