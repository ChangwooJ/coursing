const express = require('express');
const session = require('express-session');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const router = require('./router/routes');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const corsOptions = {
    origin: 'http://localhost:3000', // 클라이언트 도메인
    credentials: true, // 인증 정보 포함 허용
};

io.on('connection', (socket) => {
    console.log('새로운 클라이언트가 연결되었습니다:', socket.id);

    // 클라이언트로부터 메시지 수신
    socket.on('sendMessage', (message) => {
        console.log('메시지 수신:', message);

        // 다른 클라이언트들에게 메시지 브로드캐스트
        io.emit('receiveMessage', message);
    });

    // 클라이언트 연결 해제 처리
    socket.on('disconnect', () => {
        console.log('클라이언트가 연결을 해제했습니다:', socket.id);
    });
});


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

server.listen(PORT,()=>console.log(`port: ${PORT}`));