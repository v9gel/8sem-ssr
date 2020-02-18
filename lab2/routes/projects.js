var express = require('express');
var router = express.Router();
var db = require('../db');

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
  db.Projects.findById(req.params.id, {
    attributes: ['id', 'name', 'body', 'square', 'levels', 'picture'],
    include: [
      {
        model: db.Materials,
        attributes: ['id', 'name'],
      },
      {
        model: db.Buildings,
        as: 'buildings',
        required: false,
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }
    ]
  })
  .then(project => {
    project = JSON.parse(JSON.stringify(project));
    res.render('project_view', { title: 'Проект ' + project.name, project});
  }).catch(() => {
        res.json(404);
      }
  );
});

// страница редактирования проекта
router.get('/:id/edit', function(req, res, next) {
  res.json(req.params.id + ' edit');
});

// страница удаления проекта
router.get('/:id/delete', function(req, res, next) {
  db.Projects.destroy(
      {
        where: {
          id: req.params.id
        }
      })
      .then(project => {
        res.redirect('/admin');
      });
});

module.exports = router;
