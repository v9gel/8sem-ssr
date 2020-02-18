var express = require('express');
var router = express.Router();
var db = require('../db');

const convertResult = (result) => {
    return JSON.parse(JSON.stringify(result));
};

const getProject = async (id) => {
    let project = await db.Projects.findById(id, {
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
                through: {attributes: []}
            }
        ]
    });
    return convertResult(project);
};

const getMaterials = async () => {
    let materials = await db.Materials.findAll({
        attributes: ['id', 'name']
    });
    return convertResult(materials);
};

const getBuildings = async () => {
    let buildings = await db.Buildings.findAll({
        attributes: ['id', 'name']
    });
    return convertResult(buildings);
};

// редирект на главную
router.get('/', function (req, res, next) {
    res.redirect('/');
});

// страница добавления проекта
router.get('/add', function (req, res, next) {
    res.json('добавить проект');
});

// страница проекта
router.get('/:id', async (req, res, next) => {
    let project = await getProject(req.params.id);

    if (project) {
        res.render('project_view', {title: 'Проект ' + project.name, project});
    } else {
        res.json(404);
    }
});

// страница обновления проекта
router.post('/:id', async (req, res, next) => {
    await db.Projects.update(
        {
            name: req.body.name,
            body: req.body.body,
            levels: req.body.levels,
            square: req.body.square,
            materialId: req.body.materialId
        },
        {where: {id: req.params.id}}
    );

    let project = await db.Projects.findById(req.params.id);
    await project.setBuildings(req.body.buildings);
    res.redirect('/projects/' + req.params.id + '/edit');
});

// страница редактирования проекта
router.get('/:id/edit', async (req, res, next) => {
    let project = await getProject(req.params.id);
    let materials = await getMaterials();
    let buildings = await getBuildings();

    console.log({project});

    if (project) {
        res.render('project_edit', {title: 'Проект ' + project.name, project, materials, buildings});
    } else {
        res.json(404);
    }
});

// страница удаления проекта
router.get('/:id/delete', async (req, res, next) => {
    await db.Projects.destroy(
        {
            where: {
                id: req.params.id
            }
        })

    res.redirect('/admin');
});

module.exports = router;
