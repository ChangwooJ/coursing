const db = require('./DBinfo');

const getUser = (req, res) => {
    const query = `
    SELECT * 
    FROM coursing.user_info 
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

const postUser = (req, res) => {
    const { username, password, name, ph, email, address } = req.body;
    const query = `
    INSERT INTO coursing.user (username, password) VALUES (?, ?)
    ;`;
    const params = [username, password];
    console.log(req.body);
    db.query(query, params, (err, result)=>{
        if (err) {
            res.status(500).send(err);
            console.log('1차 실패');
        } else {
            const userId = result.insertId;
            const info_query = `
            INSERT INTO coursing.user_info (user_id, name, ph, email, address) VALUES (?, ?, ?, ?, ?)
            ;`;
            const info_params = [userId, name, ph, email, address];
            db.query(info_query, info_params, (err, result) => {
                if(err) {
                    res.status(500).send(err);
                    console.log('2차 실패');
                } else res.status(200).send('저장 성공');
            })
        }
    })
};

module.exports = { getUser, postUser };