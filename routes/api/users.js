// 登陆&注册
const express = require('express');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const keys = require('../../config/keys');
const passport = require('passport');

const router = express.Router();

// $router GET(路由请求) api/users/test/（请求地址）
// desc 返回请求的json数据
// access 公开还是私有的接口
router.get('/test', (req, res) => {
  // 返回一个json数据 告知是否通
  res.json({
    msg: 'login works'
  })
})

router.post('/register', (req, res) => {
  console.log(req.body)
  // 1.查询数据库中是否拥有邮箱
  User.findOne({
      email: req.body.email
    })
    .then((user) => {
      if (user) {
        return res.status(400).json('邮箱已被注册');
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          identity: req.body.identity,
          password: req.body.password
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            // Store hash in your password DB.
            if (err) {
              console.log(err);
            } else {
              newUser.password = hash;
              newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            }
          });
        });
      }
    })
})

// $router POST(路由请求) api/users/login/（请求地址）
// desc 返回token jwt passport
// access 公开还是私有的接口
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({
      email
    })
    .then(user => {
      if (!user) {
        return res.status(404).json('用户不存在');
      } else {
        // 密码匹配
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const rule = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                identity: user.identity
              };
              // 规则 加密名字 过期时间 箭头函数
              jwt.sign(rule, keys.secretOrKey, {
                expiresIn: 36000
              }, (err, token) => {
                if (err) throw err
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              })
            } else {
              return res.status(400).json('密码错误');
            }
          });
      }
    });
})

//  y验证token
router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  });
  // res.json({
  //   msg: "success"
  // })
  // res.json(req.user)
})
module.exports = router;
