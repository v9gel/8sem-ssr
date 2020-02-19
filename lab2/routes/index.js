var express = require('express');
var router = express.Router();
var db = require('../db');

const getProjects = async () => {
    let projects = await db.Projects.findAll({
        attributes: ['id', 'name', 'body', 'picture']
    });
    return projects;
};

const getMaterials = async () => {
    let materials = await db.Materials.findAll({
        attributes: ['id', 'name']
    });
    return convertResult(materials);
};

const convertResult = (result) => {
    return JSON.parse(JSON.stringify(result));
};

// главная, список всех проектов
router.get('/', async (req, res, next) => {
    let projects = await getProjects();
    let materials = await getMaterials();
    res.render('index', {title: 'Главная', projects, materials, isAdmin: false});
});

// админка
router.get('/admin', async (req, res, next) => {
    let projects = await getProjects();
    let materials = await getMaterials();
    res.render('index', {title: 'Админка', projects, materials, isAdmin: true});
});

module.exports = router;
