// 서버 실행 npm run start (package.json script 설정 명렁어)

var secrets = require('./secrets.json');
const express = require('express') // express 모듈 가져오기
const app = express() // 앱 생성
const port = 5000 // 5000번 포트 백서버

const mongoose = require('mongoose') // mongoose 설치, mongodb 연결
mongoose.connect('mongodb+srv://' + secrets.mongodb_user + ':' + secrets.mongodb_pw + '@boilerplate-gsiul.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false // 에러방지 설정값
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!~')) // 루트 디렉토리 hello world 출력

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)) // 지정포트에 앱 실행
