const db = require('./DBinfo');

const getCategory = (req, res) => {
    const query = `
    SELECT *
    FROM coursing.category;`;
    db.query(query, (err, result)=>{
        if (err) {
            res.status(500).send(err);
            console.log('X');
        } else {
            res.send(result);
        }
    })
};

module.exports = getCategory;