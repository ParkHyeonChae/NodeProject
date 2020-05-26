// 1. package생성 : npm init
// 2. express설치 : npm install express --save
// 3. mongoose설치 : npm install mongoose --save
// 4. index.js 생성
// 5. package.json Script 수정 : "start": "node index.js",

// 6. body-parser: npm install body-parser --save

// 7. Nodemon 설치 (서버 재시작 툴) : npm install nodemon --save-dev (-dev는 개발모드)

// 8. 비밀번호 암호화 Bcrypt 라이브러리 사용 : npm install bcrypt --save
// 9. 로그인 토큰생성 라이브러리 설치 : npm install jsonwebtoken --save
// 10. 쿠키저장용 라이브러리 설치 : npm install cookie-parser --save

// 서버 실행 npm run start (package.json script 설정 명렁어)
// Nodemon 사용 서버 실행 npm run backend (package.json script 설정)

var secrets = require('./secrets.json');
const express = require('express') // express 모듈 가져오기
const app = express() // 앱 생성
const port = 5000 // 5000번 포트 백서버

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

const config = require('./config/key')

// application/x-www-form-urlencoded 데이터 분석 가져오기 가능 설정
app.use(bodyParser.urlencoded({ extended: true }));

// application/json JSON 타입 데이터 분석 가능 설정
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require('mongoose') // mongoose 설치, mongodb 연결
// mongoose.connect('mongodb+srv://' + secrets.mongodb_user + ':' + secrets.mongodb_pw + '@boilerplate-gsiul.mongodb.net/test?retryWrites=true&w=majority', {
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false // 에러방지 설정값
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!~asdf')) // 루트 디렉토리 hello world 출력

app.post('/api/users/register', (req, res) => {
    // 여기서 회원가입시 필요한 정보를 클라에서 가져오면 DB에 넣어준다

    const user = new User(req.body)

    user.save((err, userInfo) => { // save는 mongoDB 메소드
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ // 200은 성공메세지
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 DB에서 있는지 찾음
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false, 
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        // 요청된 이메일이 DB에 있으면 PW가 일치 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
            
            // PW일치 시 토큰 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                
                // 쿠키에 토큰 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 소리는 Authentication이 True
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, // role이 0이면 일반사용자, 0이아니면 관리자
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if(err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) // 지정포트에 앱 실행
