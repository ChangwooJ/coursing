# 여행 계획 공유 플랫폼 : Coursing

## 프로젝트 소개

  * '여행 계획을 세울때 마음에 드는 장소를 일일이 찾아보고 검색하는 번거로움을 해소하자'는 의도를 가진 웹 어플리케이션 입니다.

## 개발 기간
  * 2024.07.12 ~ 2024.10.30

## 기술 스택
### FE
  * React 18
  * React Router DOM
  * Redux
  * Socket.IO Client
  * Axios

### BE
  * Node.js
  * Express
  * passport
  * bcrypt
  * Socket.IO
  * Multer
  * Nodemailer
  * Express-Session
  * MySQL

## 프로젝트 구조

```
project-root/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
|       |   ├── Auth/            # 회원가입 인증 컴포넌트 (emailCert, signup)
|       |   ├── Chat/            # 채팅 관련 컴포넌트 (roomList, urlPreview)
|       |   ├── CreatePosts/     # 글 생성 컴포넌트 (newContent, previewPost)
|       |   ├── etc/             # 페이지 외 컴포넌트 (banner, header, plan_info 등)
|       |   ├── Main/            # 메인페이지 컴포넌트 (postList, postMap)
|       |   ├── MyList/          # 내 일정 컴포넌트 (list_map, postMap)
|       |   ├── place/           # 장소 정보 컴포넌트 (place, review)
|       |   ├── Post/            # 상세 포스트 컴포넌트 (addPopUp, post)
|       |   └── UserPage/        # 유저(마이) 페이지 컴포넌트 (user_page)
│       ├── context/             # Context API (AuthContext, LocationContext 등)
│       ├── pages/               # 페이지별 컴포넌트 (Chat, Main, Login, Post, MyList 등)
│       ├── redux/               # Redux
|       |   ├── actions/
|       |   ├── reducers/
│       ├── App.js               # React DOM 랜더링
│       └── index.js
├── server/
│   ├── configs/
|   |   ├── uploadImgConfig.js   # Multer 설정
│   ├── handlers/                # 서버 요청 핸들러 (authHandler, listHandler 등)
│   ├── node_modules/
│   ├── passport/                # passport 라이브러리 설정
│   ├── router/                  # 라우팅 파일 (routes)
│   ├── sessions/
│   └── index.js                 # 서버 시작 파일
└── README.md
```

개발 기간 : 7/12 ~

1차 완료 : 10/14
<FE/BE>
- 로그인/회원가입
- 로그인 정보 배너
- 내 플랜 배너
- 메인 페이지
- 내 일정 페이지(지도 기반)
- 마이/유저 페이지
- 포스트 상세 페이지(지도 기반)
- 포스트 생성
- 일정 추가

예정 작업
- 채팅 기능
- 장소 정보&리뷰
- 게시글의 SNS적인 요소(댓글, 좋아요 등 ...)
- 게시글 표시 알고리즘
- 공유
- ...etc.
