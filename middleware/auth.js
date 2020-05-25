const { User } = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리 하는 곳

    // 1. 클라 쿠키에서 토큰을 가져옴 cookieParser이용
    let token = req.cookies.x_auth;

    // 2. 토큰을 복호화 한후 USER를 찾음
    // 3. USER가 있으면 인증
    // 4. USER가 없으면 실패
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };