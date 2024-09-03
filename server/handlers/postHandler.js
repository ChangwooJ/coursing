const db = require('./DBinfo');

const getPostList = (req, res) => {
    const query = `
    SELECT post.*, user.*, user_info.* 
    FROM coursing.post 
    LEFT JOIN coursing.user ON post.writer_id = user.id 
    LEFT JOIN coursing.user_info ON post.writer_id = user_info.user_id 
    ORDER BY post_id ASC
    ;`;
    db.query(query, (err, result)=>{
        if (err) {
            res.status(500).send(err);
            console.log('X');
        } else {
            res.send(result);
        }
    })
};

const getPostContent = (req, res) => {
    const query = `
    SELECT post.*, post_content.* 
    FROM coursing.post 
    LEFT JOIN coursing.post_content ON post.post_id = post_content._post_id
    ;`;
    db.query(query, (err, result)=>{
        if (err) {
            res.status(500).send(err);
            console.log('X');
        } else {
            res.send(result);
        }
    })
}

module.exports = {getPostList, getPostContent};