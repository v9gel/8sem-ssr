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

// страница редактирования проекта
router.get('/:id/edit', async (req, res, next) => {
    let project = await getProject(req.params.id);
    let materials = await getMaterials();
    let buildings = await  getBuildings();

    console.log({project});

    if (project) {
        res.render('project_edit', {title: 'Проект ' + project.name, project, materials, buildings});
    } else {
        res.json(404);
    }

    // .then(project => {
    //     project = JSON.parse(JSON.stringify(project));
    //     console.log({project});
    //     res.render('project_edit', {title: 'Редактирование ' + project.name, project});
    // })
    // .catch(() => {
    //     res.json(404);
    // });
});

// страница удаления проекта
router.get('/:id/delete', function (req, res, next) {
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
