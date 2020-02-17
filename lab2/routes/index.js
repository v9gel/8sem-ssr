var express = require('express');
var router = express.Router();

// главная, список всех проектов
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Главная', isAdmin: false });
});

// админка
router.get('/admin', function(req, res, next) {
  res.render('index', { title: 'Админка', isAdmin: true });
});

module.exports = router;
