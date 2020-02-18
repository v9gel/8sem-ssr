var express = require('express');
var router = express.Router();
var db = require('../db');

const getProjects = async () => {
    let projects = await db.Projects.findAll({
        attributes: ['id', 'name', 'body', 'picture']
    });
    return projects;
};

// главная, список всех проектов
router.get('/', async (req, res, next) => {
    let projects = await getProjects();
    res.render('index', {title: 'Главная', projects, isAdmin: false});
});

// админка
router.get('/admin', async (req, res, next) => {
    let projects = await getProjects();
    res.render('index', {title: 'Админка', projects, isAdmin: true});
});

module.exports = router;
