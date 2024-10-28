const db = require('./DBinfo');

const getFollow = async (req, res) => {
    const param = req.params.user_id;

    try {
        const query = `SELECT follow.followee FROM coursing.follow WHERE follow.follower = ?;`;
        const followResults = await new Promise((resolve, reject) => {
            db.query(query, param, (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if(followResults.length === 0) {
            return res.status(404).json({ message: "팔로우 목록이 없습니다." });
        }

        const followees = [];
        
        for (const fol of followResults) {
            const followeesData = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM coursing.user_info WHERE user_info.user_id = ?;`;
                db.query(query, [fol.followee], (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        resolve(result[0]);
                    }
                });
            })
            followees.push(followeesData);
        }

        res.status(200).json(followees);
        console.log("follow:",followees);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.'})
    }
    

}

const postFollowing = (req, res) => {
    const { follower, followee } = req.body;
    const query = `
    INSERT INTO coursing.follow 
    (follower, followee) VALUES (?, ?);
    ;`;
    
    db.query(query, [follower, followee], (err, result) => {
        if (err) {
            res.status(500).send(err);
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

module.exports = { getFollow, postFollowing };