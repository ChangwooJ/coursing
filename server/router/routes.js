const express = require('express');
const router = express.Router();
const upload = require('../configs/uploadImgConfig');

const {getPostList, getPostContent, postPost, uploadImg, uploadPostContent, delete_post} = require('../handlers/postHandler');
const {getList, postList, deleteList, getTitle, getUserContentList, postNewTitle} = require('../handlers/listHandler');
const {postLogin, postLogout, getLogged} = require('../handlers/authHandler');
const getUCList = require('../handlers/user_categoryHandler');
const {getPCList, postPC} = require('../handlers/post_categoryHandler');
const {getUser, postUser} = require('../handlers/userHandler');
const {postEmail, postCode} = require('../handlers/emailCertHandler');
const getCategory = require('../handlers/categoryHandler');
const { getPlace } = require('../handlers/placeHandler');
const { getReviews } = require('../handlers/reviewHandler');
const {postChatRoom, postChatMessage, getChatRoom, getChatRooms, getChatMessage} = require('../handlers/chatHandler');
const { getFollow, postFollowing } = require('../handlers/followHandler');
const { postViewed, postRecommended, getRecommend } = require('../handlers/viewHandler');

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
router.post('/newTitle', postNewTitle);

router.post('/upload_image', upload.single('image'), uploadImg);

router.post('/login', postLogin);
router.post('/logout', postLogout);
router.get('/status', getLogged);

router.post('/signup_email', postEmail);
router.post('/check_code', postCode);

router.get('/place/:id', getPlace);
router.get('/reviews/:place_id', getReviews);

router.post('/newRoom', postChatRoom);
router.post('/chat_room/message', postChatMessage);
router.get('/chat_room', getChatRoom);
router.get('/chat_rooms/:user_id', getChatRooms);
router.get('/chat_room/get_message', getChatMessage);

router.get('/followList/:user_id', getFollow);
router.post('/following', postFollowing);

router.post('/viewedPost', postViewed);
router.post('/recommmended', postRecommended);
router.get('/getRecommend', getRecommend);

module.exports = router;