const express = require('express');
const router = express.Router();
const upload = require('../configs/uploadImgConfig');

const {getPostList, getPostContent, postPost, uploadImg, uploadPostContent, delete_post} = require('../handlers/postHandler');
const {getList, postList, deleteList, getTitle, getUserContentList} = require('../handlers/listHandler');
const {postLogin, postLogout, getLogged} = require('../handlers/authHandler');
const getUCList = require('../handlers/user_categoryHandler');
const {getPCList, postPC} = require('../handlers/post_categoryHandler');
const {getUser, postUser} = require('../handlers/userHandler');
const {postEmail, postCode} = require('../handlers/emailCertHandler');
const getCategory = require('../handlers/categoryHandler');
const { getPlace } = require('../handlers/placeHandler');

router.get('/main', getPostList);
router.get('/main_content', getPostContent);
router.get('/my_list', getList);
router.get('/title', getTitle);
router.get('/user', getUser);
router.post('/saveUser', postUser);
router.get('/UC/:user_id', getUCList);
router.get('/PC', getPCList);
router.post('/add_plan', postList);
router.get('/user_content', getUserContentList);
router.delete('/delete_plan', deleteList);
router.get('/category', getCategory);
router.post('/upload_post', postPost);
router.post('/upload_PC', postPC);
router.post('/fin_upload', uploadPostContent);
router.delete('/delete_post', delete_post);

router.post('/upload_image', upload.single('image'), uploadImg);

router.post('/login', postLogin);
router.post('/logout', postLogout);
router.get('/status', getLogged);

router.post('/signup_email', postEmail);
router.post('/check_code', postCode);

router.get('/place/:id', getPlace);

module.exports = router;