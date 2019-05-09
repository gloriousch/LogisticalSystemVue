const express = require('express');
const passport = require('passport');
const peisong = require('../../models/peisong');

const router = express.Router();

// $route GET api/peisongs/test
// @desc 返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
  console.log(req)
  res.json({
    msg: 'peisong works'
  });
});

// $route POST api/peisongs/add
// @desc 创建信息接口
// @access private
router.post('/add', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  let peisongFileds = {};
  console.log(req.body)
  // if (req.body.carNum) {
  //   peisongFileds.carNum = req.body.carNum;
  // }
  if (req.body.psid) {
    peisongFileds.psid = req.body.psid;
  }
  if (req.body.psName) {
    peisongFileds.psName = req.body.psName;
  }
  if (req.body.place) {
    peisongFileds.place = req.body.place;
  }

  new peisong(peisongFileds).save().then(peisong => {
    res.json(peisong);
  })
})

// $route GET api/peisongs
// @desc 获取所有信息
// @access private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  peisong.find()
    .then(peisong => {
      if (!peisong) {
        return res.status(404).json('没有任何内容');
      }
      res.json(peisong);
    })
    .catch(err => {
      res.status(404).json(err);
    })
})

// $route GET api/peisongs/:id
// @desc 获取单个信息
// @access private
router.get('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  peisong.findOne({
      _id: req.params.id
    })
    .then(peisong => {
      if (!peisong) {
        return res.status(404).json('没有任何内容');
      }
      res.json(peisong);
    })
    .catch(err => {
      res.status(404).json(err);
    })
})

// $route POST api/peisongs/edit/:id
// @desc 编辑信息接口
// @access private
router.post('/edit/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  let peisongFileds = {};
  if (req.body.title) {
    peisongFileds.title = req.body.title;
  }
  if (req.body.type) {
    peisongFileds.type = req.body.type;
  }
  if (req.body.describe) {
    peisongFileds.describe = req.body.describe;
  }
  peisong.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: peisongFileds
  }, {
    new: true
  }).then(peisong => res.json(peisong))
})

// $route POST api/peisongs/delete/:id
// @desc 删除信息接口
// @access private
router.delete('/delete/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  peisong.findOneAndRemove({
      _id: req.params.id
    })
    .then(peisong => {
      peisong.save().then(peisong => res.json(peisong))
    })
    .catch(err => res.status(404).json('删除失败'))
})

module.exports = router;
