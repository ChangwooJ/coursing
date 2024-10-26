const db = require('./DBinfo');

const getFollow = (req, res) => {
    const param = req.params.user_id;
    console.log(param);
    const query = `
    SELECT 
    follow.*, user_info.*
    FROM coursing.user_info
    LEFT JOIN coursing.follow ON user_info.user_id = follow.follower 
    WHERE user_info.user_id = ?
    ;`;

    db.query(query, param, (err, result) => {
        if (err) {
            res.status(500).send(err);
            console.log('X');
        } else {
            res.send(result);
        }
    })
}


module.exports = { getFollow };