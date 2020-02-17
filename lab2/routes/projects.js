var express = require('express');
var router = express.Router();

// редирект на главную
router.get('/', function(req, res, next) {
  res.redirect('/');
});

// страница добавления проекта
router.get('/add', function(req, res, next) {
  res.json('добавить проект');
});

// страница проекта
router.get('/:id', function(req, res, next) {
  res.json(req.params.id);
});

// страница редактирования проекта
router.get('/:id/edit', function(req, res, next) {
  res.json(req.params.id + ' edit');
});

// страница удаления проекта
router.get('/:id/delete', function(req, res, next) {
  res.json(req.params.id + ' delete');
});

module.exports = router;
