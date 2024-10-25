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

    // 유저가 특정 유저와 대화를 시작할 때 방에 참여시킴
    socket.on('joinRoom', ({ userId, targetUserId }) => {
        const roomId = [userId, targetUserId].sort().join('_');  // 두 유저의 ID를 이용해 고유한 방 이름 생성
        socket.join(roomId);  // 해당 방에 유저를 입장시킴
        console.log(`${userId}님이 ${roomId} 방에 입장했습니다.`);
    });

    // 특정 방에서 메시지 수신
    socket.on('sendMessage', ({ roomId, message }) => {
        console.log('메시지 수신:', message, '방:', roomId);

        // 같은 방에 있는 유저들에게만 메시지 전송
        io.to(roomId).emit('receiveMessage', message);
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