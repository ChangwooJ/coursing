const express = require('express');
const router = express.Router();

const {getPostList, getPostContent} = require('../handlers/postHandler');
const {getList, postList, deleteList, getTitle} = require('../handlers/listHandler');
const {postLogin, postLogout, getLogged} = require('../handlers/authHandler');

router.get('/main', getPostList);
router.get('/main_content', getPostContent);
router.get('/my_list', getList);
router.get('/title', getTitle);
router.post('/add_plan', postList);
router.delete('/delete_plan', deleteList);

router.post('/login', postLogin);
router.post('/logout', postLogout);
router.get('/status', getLogged);

module.exports = router;