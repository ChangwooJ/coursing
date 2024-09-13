const db = require('./DBinfo');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: "wjdckddn20@gmail.com",
        pass: "nhupefzeqqalgosn",
    },
});


const postEmail = (req, res) => {
    const email = req.body.email;
    const mailCode = Math.random().toString(36).substring(2);

    const deleteQuery = "DELETE FROM coursing.mailCode WHERE email = ?;"

    db.query(deleteQuery, [email], (err, result) => {
        if (err) {
            console.error("Error deleting existing code:", err);
            return res.status(500).send("서버 에러: 기존 코드 삭제 실패");
        }
        const insertQuery = "INSERT INTO coursing.mailCode (email, code) VALUES (?, ?);";

        db.query(insertQuery, [email,mailCode], (err, result) => {
            if (err) {
                console.error("Error inserting new code:", err);
                return res.status(500).send("서버 에러: 새 코드 삽입 실패");
            }
            
            const mailOptions = {
                from: "wjdckddn20@gmail.com",
                to: email,
                subject: '이메일 인증 테스트',
                text: `아래의 코드를 사용하여 회원가입을 계속하세요!\n\n [  ${mailCode}  ]`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("X", error);
                    res.status(500).send("이메일 전송 실패");
                }
                else {
                    console.log("OK", info.response);
                    res.status(200).send("이메일 전송 성공");
                }
            });
        })
    });
}

const postCode = (req, res) => {
    const { code, email } = req.body;
    const selectQuery = `
        SELECT * FROM coursing.mailCode WHERE email = ?
    `;

    db.query(selectQuery, [email], (err, result) => {
        if (err) {
            console.error("DB 조회 오류:", err);
            return res.status(500).send("서버 에러: 코드 조회 실패");
        }

        if (result.length === 0) {
            return res.status(400).send('잘못된 인증 정보: 코드가 존재하지 않습니다.');
        }

        if (result[0].code === code) {
            const deleteQuery = "DELETE FROM coursing.mailCode WHERE email = ?;";
            db.query(deleteQuery, [email], (err, result) => {
                if (err) {
                    console.error("코드 삭제 오류:", err);
                    return res.status(500).send("서버 에러: 코드 삭제 실패");
                }
                return res.status(200).send('인증 성공');
            });
        } else {
            return res.status(400).send('잘못된 인증 정보: 코드 불일치');
        }
    });
};

module.exports = {postEmail, postCode};