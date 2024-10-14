const db = require('./DBinfo');

const getList = (req, res) => {
    const query = `
    SELECT 
    user.*, user_content.*, user_content_list.*, category.* 
    FROM coursing.user 
    LEFT JOIN coursing.user_content ON user.id = user_content._user_id 
    LEFT JOIN coursing.user_content_list ON user_content.user_content_id = user_content_list.content_id 
    LEFT JOIN coursing.category ON user_content_list.category = category.category_id 
    ORDER BY user_content_id ASC, start_time ASC;`;
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
    const { address, name, content_id, category, start_time, end_time } = req.body;
    const query = `
    INSERT 
    INTO coursing.user_content_list 
    (address, name, content_id, category, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)
    ;`;
    const params = [address, name, content_id, category, start_time, end_time];
    db.query(query, params, (err, result)=>{
        if(err) {
            res.status(500).send(err);
            console.log(err);
        } else {
            res.status(200).json({ message: 'user_content added successfully' });
        }
    })
}

const getUserContentList = (req, res) => {
    const query = `
    SELECT address, name, content_id, category AS cate_id, start_time, end_time
    FROM coursing.user_content_list;
    ;`;

    db.query(query, (err, result)=>{
        if(err) {
            res.status(500).send(err);
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })
}

const deleteList = (req, res) => {
    const list_id = req.query.list_id;
    const query = `
    DELETE 
    FROM coursing.user_content_list
    WHERE list_id = ?
    ;`;
    db.query(query, [list_id], (err, result) => {
        if (err) {
            res.status(500).send(err);
            console.log(err);
        } else {
            res.status(200).json({ message: 'user_content_list deleted successfully' });
        }
    });
}

const getTitle = (req, res) => {
    const query = `
    SELECT
    user_content.* 
    FROM coursing.user_content
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

module.exports = { getList, postList, getUserContentList, deleteList, getTitle };