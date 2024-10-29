const db = require('./DBinfo');

const postViewed = (req, res) => {
    const { viewed_post_id, user_id } = req.body;

    try {
        const query = `SELECT * FROM coursing.user_viewed WHERE _user_id = ? AND viewed_post_id = ?`;
        db.query(query, [user_id, viewed_post_id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error exist viewed" });
            }

            if (result.length > 0) {
                return res.status(200).json({ message: "Post already viewed" });
            }

            const query2 = `INSERT INTO coursing.user_viewed (_user_id, viewed_post_id, recommend) VALUES (?, ?, ?);`;
            db.query(query2, [user_id, viewed_post_id, 0], (err, result) => {
                if (err) {
                    console.error("Error saving viewed post:", err);
                    return res.status(500).json({ message: "Failed to save viewed post" });
                }

                res.status(201).json({ message: "Viewed post saved" });
            });
        });
    } catch (error) {
        console.error("Error saving viewed post:", error);
        res.status(500).json({ message: "Failed to save viewed post" });
    }
};

const postRecommended = (req, res) => {
    const { viewed_post_id, user_id } = req.body;

    try {
        const query = `SELECT * FROM coursing.user_viewed WHERE _user_id = ? AND viewed_post_id = ?`;
        db.query(query, [user_id, viewed_post_id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error exist viewed" });
            }

            if (result.length > 0) {
                const query3 = `UPDATE coursing.user_viewed SET recommend = ? WHERE _user_id = ? AND viewed_post_id = ?`;
                return db.query(query3, [1, user_id, viewed_post_id], (err, updateResult) => {
                    if (err) {
                        console.error("Error updating recommend value:", err);
                        return res.status(500).json({ message: "Failed to update recommend value" });
                    }
                    updateRecommended(viewed_post_id, res);
                });
            } else {
                const query2 = `INSERT INTO coursing.user_viewed (_user_id, viewed_post_id, recommend) VALUES (?, ?, ?);`;
                db.query(query2, [user_id, viewed_post_id, 1], (err, result) => {
                    if (err) {
                        console.error("Error saving viewed post:", err);
                        return res.status(500).json({ message: "Failed to save viewed post" });
                    }
                    updateRecommended(viewed_post_id, res);
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save commended" });
    }
}

function updateRecommended(viewed_post_id, res) {
    const queryGetCommended = `SELECT commended FROM coursing.post WHERE post_id = ?;`;
    db.query(queryGetCommended, [viewed_post_id], (err, result) => {
        if (err) {
            console.error("Error retrieving commended value:", err);
            return res.status(500).json({ message: "Failed to retrieve commended value" });
        }

        const currentCommended = result[0].commended;
        const updatedCommended = currentCommended + 1;

        const query3 = `UPDATE coursing.post SET commended = ? WHERE post_id = ?;`;
        db.query(query3, [updatedCommended, viewed_post_id], (err, result) => {
            if (err) {
                console.error("Error saving viewed post:", err);
                return res.status(500).json({ message: "Failed to save viewed post" });
            }
            return res.status(201).json({ message: "Viewed post and commended value updated" });
        });
    })
}

const getRecommend = (req, res) => {
    const { viewed_post_id, user_id } = req.query;

    const query = `SELECT user_viewed.recommend FROM coursing.user_viewed WHERE _user_id = ? AND viewed_post_id = ?`
    db.query(query, [user_id, viewed_post_id], (err, result) => {
        if (err) {
            console.error("Error get recommended post:", err);
            return res.status(500).json({ message: "Failed to get recommended post" });
        }

        res.status(200).json({ recommend: result[0].recommend });
    });
}

module.exports = { postViewed, postRecommended, getRecommend };
