const express = require('express');
const session = require('express-session');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const router = require('./router/routes');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // 클라이언트 도메인
    credentials: true, // 인증 정보 포함 허용
};


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
    secret: 'coursing_test_key',
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
}));

app.use(passport.initialize());  //세션 설정 뒤에 적용
app.use(passport.session());

app.use('/api', router);

app.listen(PORT,()=>console.log(`port: ${PORT}`));