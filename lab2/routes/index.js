var express = require('express');
var router = express.Router();
var db = require('../db');

// главная, список всех проектов
router.get('/', function(req, res, next) {
  db.Projects.findAll({
    attributes: ['id', 'name', 'body', 'picture']
  })
  .then(projects => {
    res.render('index', { title: 'Главная', projects, isAdmin: false });
  });
});

// админка
router.get('/admin', function(req, res, next) {
  db.Projects.findAll({
    attributes: ['id', 'name', 'body', 'picture'],
  })
  .then(projects => {
    res.render('index', { title: 'Админка', projects, isAdmin: true });
  });
});

module.exports = router;
