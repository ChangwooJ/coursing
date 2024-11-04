# 여행 계획 공유 플랫폼 : Coursing

## 프로젝트 소개
  * '여행 계획을 세울때 마음에 드는 장소를 일일이 찾아보고 검색하는 번거로움을 해소하자'는 의도를 가진 웹 어플리케이션 입니다.

## 개발 기간
  * 2024.07.12 ~ 2024.10.30

## 기술 스택
### FE
  * ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  * ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
  * ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  * ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
  * ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
  * [![axios](https://img.shields.io/badge/axios-^1.4.0-blue)](https://axios-http.com)


### BE
  * ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  * ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  * ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
  * ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
  * passport
  * Multer
  * Nodemailer
  * Express-Session

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

## 프로젝트 주요 기능
  * 지도 기반의 여행 계획을 세울 수 있습니다.
  * 지도 기반의 게시글을 보거나 업로드 할 수 있습니다.
  * 상대와 채팅을 통해 소통을 하거나 게시물을 공유할 수 있습니다.
  * 특정 장소를 검색해 장소 정보를 찾아보거나 리뷰 정보를 제공받을 수 있습니다.

## 페이지 설명
  * 로그인/회원가입

    ![회원가입   로그인 동영상 배속 - Clipchamp로 제작 (1)](https://github.com/user-attachments/assets/a0efe106-d3a8-4e65-9752-db83e0b3402a)

    회원가입 후 로그인을 시도하는 동작입니다.

    사용자가 회원가입 정보를 기입하면 기입된 메일로 임의의 코드가 발송됩니니다. (NodeMailer)

  * 메인 페이지
    
    ![메인페이지 동영상 배속 - Clipchamp로 제작](https://github.com/user-attachments/assets/2bc7707d-57e5-411a-b4a8-32667688accb)

    메인페이지에서 게시글들을 확인할 수 있습니다.
    
    우측 하단의 '추천'기능을 이용해 다른 사람에게 추천하거나 추천목록으로 저장해둘 수 있습니다.

  * 포스트 상세 페이지
    
    ![상세 페이지 동영상 배속 - Clipchamp로 제작](https://github.com/user-attachments/assets/dff5e59e-36fa-484f-b361-8361c8b8c000)

    메인페이지나 유저페이지에서 포스트를 클릭하면 해당 포스트의 상세 페이지를 볼 수 있습니다.
    
    상세 페이지에서는 소개되어 있는 장소의 위치, 동선 등을 추가로 볼 수 있고, 마음에 드는 장소가 있다면 상단 바에 존재하는 해당 장소 추가 버튼을 눌러 '내 일정에 추가 팝업'을 통해서 진행할 수 있습니다.
    
    내 일정에 추가 팝업에서는 일정을 선택하고, 중복 일정이 없는 시간대와 장소에 대한 메모만 작성하면 손쉽게 추가할 수 있습니다.
    
  * 채팅 페이지

    ![채팅 공유 동영상 배속 - Clipchamp로 제작](https://github.com/user-attachments/assets/574dfa88-d6ad-4a6b-9eba-2bcb9d83bc28)

    원하는 상대방(친구)와 채팅을 통해 소통할 수 있습니다.
    
    상세페이지에서 확인해보고 친구에게 포스트를 공유할 수 있습니다.
    
    링크형태로 보내진 메시지를 확인하고 상대방은 해당 링크를 통해 같은 게시물을 확인할 수 있습니다.

        
  * 내 일정/장소 검색 페이지
    - 내 일정 확인
      
    ![내 일정 페이지 동영상 - Clipchamp로 제작](https://github.com/user-attachments/assets/2d947a22-e270-4970-8844-9f2dfaff41ec)

    내 일정 페이지에서 내 일정에 대한 관리와 확인을 할 수 있습니다.

    - 장소 검색
      
    ![장소 검색 동영상 - Clipchamp로 제작](https://github.com/user-attachments/assets/d3b6f3b8-6754-4f05-be0f-c8e6dd425286)
    
    장소 검색 페이지에서 원하는 장소를 검색하고 해당 장소에 대한 정보와 방문자 리뷰 등을 확인할 수 있습니다.
    
    상세 페이지에서처럼 즉시 내 일정에 추가도 가능합니다.
    
    
  * 유저(마이) 페이지

    ![유저   마이 페이지 - Clipchamp로 제작](https://github.com/user-attachments/assets/0e2424e9-d8d5-427e-888d-21e7d9aa399b)

    원하는 유저의 프로필을 클릭하면 해당 유저의 페이지로 이동합니다.
    
    해당 유저와 교류를 위한 팔로우 기능, 메시지를 보내기 위한 링크 버튼, 상대방의 포스트를 보기 위한 목록 등을 확인할 수 있습니다.
    
    좌측 상단의 버튼을 통해 마이페이지로 이동할 수 있습니다.
    
    이곳에서 나의 정보 확인과 포스트들을 확인할 수 있고, 새 글 작성을 할 수 있습니다.

  * 글 쓰기 페이지

    - 기존 일정으로 글 생성
   
      ![기존 일정 글생성 예시 - Clipchamp로 제작](https://github.com/user-attachments/assets/1b5318f2-4989-414a-b558-6ca792c6d84c)

      나의 기존 일정에서 선택하여 글을 작성할 수 있습니다.
      
      필요에 따라 일정은 편집이 가능하고, 모든 일정에 이미지와 컨텐츠가 달리기 전까지는 포스트의 업로드가 불가능합니다.

   
    - 새 일정으로 글 생성
   
      ![새 일정 글 생성 동영상 배속 - Clipchamp로 제작](https://github.com/user-attachments/assets/f206580e-6c48-41f9-9e11-846b0304019e)

      새로운 일정을 만들어 글을 작성할 수 있습니다.
      
      장소부터 방문 시간 등의 정보를 기입해주어야합니다.

## ERD

```mermaid
erDiagram
    category {
        int category_id PK
        varchar category_name
        varchar cate_img_src
    }
    chat_log {
        int log_id PK
        varchar room_name FK
        int send_user_id
        TEXT message
        TIMESTAMP timestamp
    }
    chat_room {
        int chat_room_id PK
        varchar room_name
        int user_id FK
        int target_user_id FK
    }
    follow {
        int follow_id PK
        int follower FK
        int followee FK
    }
    mailcode {
        int id PK
        varchar email
        varchar code
    }
    place {
        int place_id PK
        varchar place_name
        varchar address
        int category_id FK
        varchar ph
        int open
        int close
        int id
    }
    place_img {
        int place_img_id PK
        int _place_id FK
        varchar place_img_src
    }
    post {
        int post_id PK
        varchar title
        int writer_id FK
        DATE date
        int commended
    }
    post_category {
        int category_id FK
        int post_id FK
    }
    post_content {
        int content_id PK
        int _post_id FK
        TEXT content
        varchar img_src
        varchar address
        int start_time
        int end_time
        varchar name
    }
    review {
        int review_id PK
        int _place_id FK
        int user_id FK
        TEXT comment
        DECIMAL(3,2) rating
        DATE date
    }
    review_img {
        int review_img_id PK
        int _review_id FK
        varchar review_img_src
    }
    user {
        int id PK
        varchar username
        varchar password
    }
    user_info {
        int info_id PK
        int user_id FK
        varchar name
        varchar ph
        varchar email
        varchar address
        varchar profile_img
    }
    user_category {
        int user_id FK
        int category_id FK
    }
    user_content {
        int user_content_id PK
        int _user_id FK
        varchar user_content_title
    }
    user_content_list {
        int list_id PK
        TEXT address
        TEXT name
        int content_id
        int category FK
        int start_time
        int end_time
    }
    user_viewed {
        int user_viewed_id PK
        int _user_id FK
        int viewed_post_id FK
        TINYINT recommend
    }

    category ||--o{ place : "has category"
    category ||--o{ post_category : "categorizes"
    user ||--o{ chat_room : "can create"
    user ||--o{ follow : "follows"
    user ||--o{ user_info : "has"
    user ||--o{ user_category : "prefers"
    user ||--o{ user_content : "owns"
    user ||--o{ user_viewed : "views"
    post ||--o{ post_category : "has categories"
    post ||--o{ post_content : "has contents"
    place ||--o{ place_img : "has images"
    review ||--o{ review_img : "has images"



1차 완료 : 10/14
