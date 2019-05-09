const express = require('express');
const passport = require('passport');
const dingdan = require('../../models/dingdan');

const router = express.Router();

// $route GET api/dingdans/test
// @desc 返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
  console.log(req)
  res.json({
    msg: 'dingdan works'
  });
});

// $route POST api/dingdans/add
// @desc 创建信息接口
// @access private
router.post('/add', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  let dingdanFileds = {};
  console.log(req.body)
  // if (req.body.carNum) {
  //   dingdanFileds.carNum = req.body.carNum;
  // }
  if (req.body.ddId) {
    dingdanFileds.ddId = req.body.ddId;
  }
  if (req.body.fDz) {
    dingdanFileds.fDz = req.body.fDz;
  }
  if (req.body.fName) {
    dingdanFileds.fName = req.body.fName;
  }
  if (req.body.fNum) {
    dingdanFileds.fNum = req.body.fNum;
  }
  if (req.body.sDz) {
    dingdanFileds.sDz = req.body.sDz;
  }
  if (req.body.sName) {
    dingdanFileds.sName = req.body.sName;
  }
  if (req.body.sNum) {
    dingdanFileds.sNum = req.body.sNum;
  }
  if (req.body.fp) {
    dingdanFileds.fp = req.body.fp;
  }
  new dingdan(dingdanFileds).save().then(dingdan => {
    res.json(dingdan);
  })
})

// $route GET api/dingdans
// @desc 获取所有信息
// @access private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  dingdan.find()
    .then(dingdan => {
      if (!dingdan) {
        return res.status(404).json('没有任何内容');
      }
      res.json(dingdan);
    })
    .catch(err => {
      res.status(404).json(err);
    })
})

// $route GET api/dingdans/:id
// @desc 获取单个信息
// @access private
router.get('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  dingdan.findOne({
      _id: req.params.id
    })
    .then(dingdan => {
      if (!dingdan) {
        return res.status(404).json('没有任何内容');
      }
      res.json(dingdan);
    })
    .catch(err => {
      res.status(404).json(err);
    })
})

// $route POST api/dingdans/edit/:id
// @desc 编辑信息接口
// @access private
router.post('/edit/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  let dingdanFileds = {};
  if (req.body.title) {
    dingdanFileds.title = req.body.title;
  }
  if (req.body.type) {
    dingdanFileds.type = req.body.type;
  }
  if (req.body.describe) {
    dingdanFileds.describe = req.body.describe;
  }
  dingdan.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: dingdanFileds
  }, {
    new: true
  }).then(dingdan => res.json(dingdan))
})

// $route POST api/dingdans/delete/:id
// @desc 删除信息接口
// @access private
router.delete('/delete/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  dingdan.findOneAndRemove({
      _id: req.params.id
    })
    .then(dingdan => {
      dingdan.save().then(dingdan => res.json(dingdan))
    })
    .catch(err => res.status(404).json('删除失败'))
})

module.exports = router;
