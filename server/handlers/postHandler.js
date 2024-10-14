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
    SELECT post.*, post_content.* , category.cate_img_src
    FROM coursing.post 
    LEFT JOIN coursing.post_content ON post.post_id = post_content._post_id
    LEFT JOIN coursing.category ON post_content.cate_id = category.category_id 
    ORDER BY post_id ASC, start_time ASC
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

const postPost = (req, res) => {
    const { title, writer_id } = req.body;
    const date = new Date();

    const query = `
    INSERT INTO coursing.post (title, writer_id, date) VALUES (?, ?, ?)
    ;`;

    db.query(query, [title, writer_id, date], (err, result) => {
        if (err) {
            console.error('Error inserting post:', err);
            return res.status(500).json({ message: 'Error inserting post' });
        }
        res.status(201).json({ message: 'Post created successfully', post_id: result.insertId });
    });
}

const uploadPostContent = (req, res) => {
    const {_post_id, content, img_src, address, cate_id, start_time, end_time, name} = req.body;
    const query = `
    INSERT INTO coursing.post_content
    (_post_id, content, img_src, address, cate_id, start_time, end_time, name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ;`;
    const params = [_post_id, content, img_src, address, cate_id, start_time, end_time, name];
    db.query(query, params, (err, result) => {
        if (err) {
            console.error('Error inserting content:', err);
            return res.status(500).json({ message: 'Error inserting content' });
        }
        res.status(201).json({ message: 'Post created successfully'});
    });
}

const uploadImg = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const imagePath = `/img/${req.file.filename}`;  // 클라이언트에서 접근 가능한 경로
    res.json({ img_src: imagePath });
}

const delete_post = (req, res) => {
    const post_id = req.query.post_id;

    if (!post_id) {
        return res.status(400).json({ message: 'post_id is required' });
    }

    db.beginTransaction(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Transaction error' });
        }

        const query = `DELETE FROM coursing.post_category WHERE post_id = ?;`;
        db.query(query, [post_id], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    console.error(err);
                    res.status(500).json({ message: 'Error deleting post_category' });
                })
            }
            const query2 = `DELETE FROM coursing.post WHERE post_id = ?;`;
            db.query(query2, [post_id], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        console.error(err);
                        res.status(500).json({ message: 'Error deleting post' });
                    })
                }
                const query3 = `DELETE FROM coursing.post_content WHERE _post_id = ?;`;
                db.query(query3, [post_id], (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error(err);
                            res.status(500).json({ message: 'Error deleting post_content' });
                        })
                    }
                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                console.error(err);
                                res.status(500).json({ message: 'Error committing transaction' });
                            });
                        }
                        res.status(200).json({ message: 'Post deleted successfully' });
                    });
                })
            })
        })
    })
}

module.exports = {getPostList, getPostContent, postPost, uploadImg, uploadPostContent, delete_post};