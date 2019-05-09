const express = require('express');
const passport = require('passport');
const Driver = require('../../models/driver');

const router = express.Router();

// $route GET api/drivers/test
// @desc 返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
  console.log(req)
  res.json({
    msg: 'Driver works'
  });
});

// $route POST api/Drivers/add
// @desc 创建信息接口
// @access private
router.post('/add', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  let DriverFileds = {};
  console.log(req.body)
  // if (req.body.carNum) {
  //   DriverFileds.carNum = req.body.carNum;
  // }
  if (req.body.name) {
    DriverFileds.name = req.body.name;
  }
  if (req.body.sex) {
    DriverFileds.sex = req.body.sex;
  }
  if (req.body.num) {
    DriverFileds.num = req.body.num;
  }
  if (req.body.state) {
    DriverFileds.state = req.body.state;
  }
  new Driver(DriverFileds).save().then(Driver => {
    res.json(Driver);
  })
})

// $route GET api/Drivers
// @desc 获取所有信息
// @access private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Driver.find()
    .then(Driver => {
      if (!Driver) {
        return res.status(404).json('没有任何内容');
      }
      res.json(Driver);
    })
    .catch(err => {
      res.status(404).json(err);
    })
})

// $route GET api/Drivers/:id
// @desc 获取单个信息
// @access private
router.get('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Driver.findOne({
      _id: req.params.id
    })
    .then(Driver => {
      if (!Driver) {
        return res.status(404).json('没有任何内容');
      }
      res.json(Driver);
    })
    .catch(err => {
      res.status(404).json(err);
    })
})

// $route POST api/Drivers/edit/:id
// @desc 编辑信息接口
// @access private
router.post('/edit/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  let DriverFileds = {};
  if (req.body.title) {
    DriverFileds.title = req.body.title;
  }
  if (req.body.type) {
    DriverFileds.type = req.body.type;
  }
  if (req.body.describe) {
    DriverFileds.describe = req.body.describe;
  }
  Driver.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: DriverFileds
  }, {
    new: true
  }).then(Driver => res.json(Driver))
})

// $route POST api/Drivers/delete/:id
// @desc 删除信息接口
// @access private
router.delete('/delete/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Driver.findOneAndRemove({
      _id: req.params.id
    })
    .then(Driver => {
      Driver.save().then(Driver => res.json(Driver))
    })
    .catch(err => res.status(404).json('删除失败'))
})

module.exports = router;
