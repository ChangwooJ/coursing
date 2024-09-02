const db = require('./DBinfo');

const getUCList = (req, res) => {
    const param = req.params.user_id;
    const query = `
    SELECT user.id, category.category_name, category.cate_img_src  
    FROM coursing.user 
    JOIN coursing.user_category ON user.id = user_category.user_id 
    JOIN coursing.category ON user_category.category_id = category.category_id  
    WHERE user.id = ?
    ;`;
    db.query(query, [param], (err, result)=>{
        if (err) {
            res.status(500).send(err);
            console.log('X');
        } else {
            res.send(result);
        }
    })
};

module.exports = getUCList;