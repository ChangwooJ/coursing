const db = require('./DBinfo');

const postChatRoom = (req, res) => {
    const { room_name, user_id, target_user_id } = req.body;
    console.log(user_id);
    const query = `
    INSERT
    INTO coursing.chat_room
    (room_name, user_id, target_user_id) VALUES (?, ?, ?);`;
    const params = [room_name, user_id, target_user_id];
    db.query(query, params, (err, result)=>{
        if (err) {
            res.status(500).send(err);
            console.log('X');
        } else {
            res.send(result);
        }
    })
};

const postChatMessage = (req, res) => {
    const { room_name, send_user_id, message } = req.body;
    const query = `
    INSERT
    INTO coursing.chat_log
    (room_name, send_user_id, message) VALUES (?, ?, ?);`;
    const params = [room_name, send_user_id, message];
    db.query(query, params, (err, result)=>{
        if (err) {
            res.status(500).send(err);
            console.log('X');
        } else {
            res.send(result);
        }
    })
}

const getChatRoom = async (req, res) => {
    const { room_name } = req.query;

    try {
        const roomResults = await new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM coursing.chat_room WHERE room_name = ?',
                [room_name],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });

        if (roomResults.length === 0) {
            return res.status(200).json({ exists: false, chatLogs: [] });
        }

        const chatLogs = await new Promise((resolve, reject) => {
            db.query(
                'SELECT message, send_user_id, DATE_FORMAT(timestamp, "%H:%i") AS time FROM coursing.chat_log WHERE room_name = ? ORDER BY timestamp ASC',
                [room_name],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });

        return res.status(200).json({ exists: true, chatLogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
}

const getChatRooms = (req, res) => {
    const param = req.params.user_id;
    const query = `
    SELECT * 
    FROM coursing.chat_room 
    WHERE user_id = ? OR target_user_id = ?;`;
    db.query(query, [param, param], (err, result)=>{
        if (err) {
            res.status(500).send(err);
            console.log('X');
        } else {
            res.send(result);
            console.log(result);
        }
    })
}

const getChatMessage = (req, res) => {
    const param = req.query;
    const query = `
    SELECT message, send_user_id, DATE_FORMAT(timestamp, "%H:%i") AS time
    FROM coursing.chat_log 
    WHERE room_name = ?;`;
    db.query(query, [param], (err, result)=>{
        if (err) {
            res.status(500).send(err);
            console.log('X');
        } else {
            res.send(result);
        }
    })
}

module.exports = {postChatRoom, postChatMessage, getChatRoom, getChatRooms, getChatMessage};