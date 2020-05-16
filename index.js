// 서버 실행 npm run start (package.json script 설정 명렁어)

const express = require('express') // express 모듈 가졍괴
const app = express() // 앱 생성
const port = 5000 // 5000번 포트 백서버

app.get('/', (req, res) => res.send('Hello World!~')) // 루트 디렉토리 hello world 출력

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)) // 지정포트에 앱 실행
