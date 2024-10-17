const db = require('./DBinfo');

const getPlace = (req, res) => {
    const id = req.params.id;
    const query = `
    SELECT place.*, place_img.* 
    FROM place 
    LEFT JOIN place_img ON place.place_id = place_img._place_id 
    WHERE place.id = ?
    ;`;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error getPlace:", err);
            return res.status(500).json({ error: "Error getPlace" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Place.id not found" });
        }

        const placeData = {
            id: results[0].id,
            place_name: results[0].place_name,
            address: results[0].address,
            category_id: results[0].category_id,
            ph: results[0].ph,
            open: results[0].open,
            close: results[0].close,
            img: results.map(res => res.place_img_src).filter(image => image !== null)
        };

        res.json(placeData);
    });
};

module.exports = {getPlace};