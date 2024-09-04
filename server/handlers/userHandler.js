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

module.exports = getUser;