const db = require('./DBinfo');

const getReviews = (req, res) => {
    const place_id = req.params.place_id;
    const query = `
    SELECT review.* , review_img.*, user_info.* 
    FROM review 
    LEFT JOIN review_img ON review.review_id = review_img._review_id
    LEFT JOIN user_info ON review.user_id = user_info.user_id 
    WHERE review._place_id = ?
    ;`;
    db.query(query, [place_id], (err, results) => {
        if (err) {
            console.error("Error getReviews:", err);
            return res.status(500).json({ error: "Error getReviews" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "review._place_id not found" });
        }

        const reviews = [];
        const reviewMap = new Map();

        results.forEach(res => {
            const review_id = res.review_id;
            if (!reviewMap.has(review_id)) {
                reviewMap.set(review_id, {
                    name: res.name,
                    profile_img: res.profile_img,
                    review_id: res.review_id,
                    place_id: res._place_id,
                    user_id: res.user_id,
                    comment: res.comment,
                    rating: res.rating,
                    date: res.date,
                    img: []
                });
            }
            if (res.review_img_src) {
                reviewMap.get(review_id).img.push(res.review_img_src);
            }
        });

        reviewMap.forEach(value => reviews.push(value));

        res.json(reviews);
    });
};

module.exports = {getReviews};