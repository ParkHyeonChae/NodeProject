// 1. package생성 : npm init
// 2. express설치 : npm install express --save
// 3. mongoose설치 : npm install mongoose --save
// 4. index.js 생성
// 5. package.json Script 수정 : "start": "node index.js",

// 6. body-parser: npm install body-parser --save

// 7. Nodemon 설치 (서버 재시작 툴) : npm install nodemon --save-dev (-dev는 개발모드)


// 서버 실행 npm run start (package.json script 설정 명렁어)
// Nodemon 사용 서버 실행 npm run backend (package.json script 설정)

var secrets = require('./secrets.json');
const express = require('express') // express 모듈 가져오기
const app = express() // 앱 생성
const port = 5000 // 5000번 포트 백서버

const bodyParser = require('body-parser');
const { User } = require('./models/User');

// application/x-www-form-urlencoded 데이터 분석 가져오기 가능 설정
app.use(bodyParser.urlencoded({ extended: true }));

// application/json JSON 타입 데이터 분석 가능 설정
app.use(bodyParser.json());

const mongoose = require('mongoose') // mongoose 설치, mongodb 연결
mongoose.connect('mongodb+srv://' + secrets.mongodb_user + ':' + secrets.mongodb_pw + '@boilerplate-gsiul.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false // 에러방지 설정값
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!~asdf')) // 루트 디렉토리 hello world 출력

app.post('/register', (req, res) => {
    // 여기서 회원가입시 필요한 정보를 클라에서 가져오면 DB에 넣어준다

    const user = new User(req.body)

    user.save((err, userInfo) => { // save는 mongoDB 메소드
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ // 200은 성공메세지
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) // 지정포트에 앱 실행
