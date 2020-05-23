const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 // 10자리로 암호화

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 공백제거 역할
        unique: 1
    },
    password: {
        type: String,
        maxlength: 50
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 권한
        type: Number,
        default: 0
    },
    image: String,

    token: {
        type: String
    },
    tokenExp: { // 토큰 유효기간
        type: Number
    }
})

userSchema.pre('save', function( next ){
    var user = this;

    if(user.isModified('password')) {
        // 여기서 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // 입력된 비밀번호와 엄호화된 비밀번호 체크
    // 이미 암호화된 pw 복호화 불가, 입력 pw 다시 암호화 후 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
            cb(null, isMatch)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User } // User모델 모듈화