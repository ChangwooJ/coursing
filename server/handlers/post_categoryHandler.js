const db = require('./DBinfo');

const getPCList = (req, res) => {
    const query = `
    SELECT post.post_id, category.category_name, category.cate_img_src  
    FROM coursing.post 
    JOIN coursing.post_category ON post.post_id = post_category.post_id 
    JOIN coursing.category ON post_category.category_id = category.category_id
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

module.exports = getPCList;