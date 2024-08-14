const db = require('./DBinfo');

const getList = (req, res) => {
    const query = `
    SELECT 
    user.*, user_content.*, user_content_list.*, category.* 
    FROM coursing.user 
    LEFT JOIN coursing.user_content ON user.id = user_content._user_id 
    LEFT JOIN coursing.user_content_list ON user_content.user_content_id = user_content_list.content_id 
    LEFT JOIN coursing.category ON user_content_list.category = category.category_id 
    ORDER BY list_id ASC;`;
    db.query(query, (err, result)=>{
        if (err) {
            res.status(500).send(err);
            console.log('X');
        } else {
            res.send(result);
        }
    })
};

const postList = (req, res) => {
    const { list_address, memo, content_id } = req.body;
    const query = `
    INSERT 
    INTO coursing.user_content_list 
    (list_address, memo, content_id) VALUES (?, ?, ?)
    ;`;
    const params = [list_address, memo, content_id];
    db.query(query, params, (err, result)=>{
        if(err) {
            res.status(500).send(err);
            console.log(err);
        } else {
            res.send(result);
        }
    })
}

const deleteList = (req, res) => {
    const { list_id } = req.body;

    const query = `
    DELETE 
    FROM coursing.user_content_list
    WHERE list_id = ?
    ;`;

    const params = [list_id];
    db.query(query, params, (err, result) => {
        if (err) {
            res.status(500).send(err);
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

module.exports = { getList, postList, deleteList };