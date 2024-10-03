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

const postPC = (req, res) => {
    const { post_id, category_id } = req.body;
    const query = `
    INSERT coursing.post_category (category_id, post_id) VALUES (?, ?)
    ;`;

    db.query(query, [post_id, category_id], (err, result) => {
        if (err) {
            console.error('Error inserting PC:', err);
            return res.status(500).json({ message: 'Error inserting PC' });
        }
        res.status(201).json({ message: 'PC created successfully'});
    });
}

module.exports = {getPCList, postPC};