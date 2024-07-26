const db = require('./DBinfo');

const getList = (req, res) => {
    const query = `
    SELECT user.*, user_content.*, user_content_list.*
    FROM coursing.user 
    LEFT JOIN coursing.user_content ON user.id = user_content._user_id 
    LEFT JOIN coursing.user_content_list ON user_content.user_content_id = user_content_list.content_id
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

module.exports = getList;