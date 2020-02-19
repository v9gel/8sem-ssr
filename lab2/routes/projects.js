var express = require('express');
var router = express.Router();
var db = require('../db');
const path = require('path');
const {uuid} = require('uuidv4');
var createError = require('http-errors');

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
router.get('/', (req, res, next) => {
    res.redirect('/');
});

// добавление проекта
router.post('/', async (req, res, next) => {
    if (req.files === null) {
        req.body.picture = 'http://placehold.it/750x300';
    } else {
        const newPictureName = uuid();
        await req.files.picture.mv('./public/pictures/' + newPictureName + '.jpg');
        req.body.picture = '/pictures/' + newPictureName + '.jpg';
    }

    let project = await db.Projects.create(req.body);
    await project.setBuildings(req.body.buildings);
    res.redirect('/admin');
});

// страница добавления проекта
router.get('/add', async (req, res, next) => {
    let project = {
        id: '',
        name: 'Название проекта',
        body: 'Описание проекта',
        levels: 1,
        material: {
            id: 1
        },
        square: 100,
        picture: 'http://placehold.it/750x300',
        buildings: [{id: 1}]
    };
    let materials = await getMaterials();
    let buildings = await getBuildings();
    if (project) {
        res.render('project_edit', {title: 'Создание проекта ', project, materials, buildings, isEdit: false});
    } else {
        res.json(404);
    }
});

// фильтрация по материалу
router.post('/material', async (req, res, next) => {
    let projects;
    if (req.body.materialId !== 'all') {
        projects = await db.Projects.findAll({
            where: {
                materialId: req.body.materialId
            },
            attributes: ['id', 'name', 'body', 'picture']
        });
    } else {
        projects = await db.Projects.findAll({
            attributes: ['id', 'name', 'body', 'picture']
        });
    }

    projects = convertResult(projects);
    console.log({projects});

    res.render('project_filtred', {projects});
});

// страница проекта
router.get('/:id', async (req, res, next) => {
    let project = await getProject(req.params.id);

    if (project) {
        res.render('project_view', {title: 'Проект ' + project.name, project});
    } else {
        next(createError(404));
    }
});

// информация о проекте во всплывающей подсказке
router.get('/:id/quick', async (req, res, next) => {
    let project = await getProject(req.params.id);

    if (project) {
        res.render('project_quick', project);
    } else {
        next(createError(404));
    }
});

// обновления проекта
router.post('/:id', async (req, res, next) => {
    if (req.files === null) {
        let project = await getProject(req.params.id);
        req.body.picture = project.picture;
    } else {
        const newPictureName = uuid();
        await req.files.picture.mv('./public/pictures/' + newPictureName + '.jpg');
        req.body.picture = '/pictures/' + newPictureName + '.jpg';
    }

    await db.Projects.update(
        {
            name: req.body.name,
            body: req.body.body,
            levels: req.body.levels,
            square: req.body.square,
            materialId: req.body.materialId,
            picture: req.body.picture
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
        res.render('project_edit', {title: 'Проект ' + project.name, project, materials, buildings, isEdit: true});
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
        });

    res.redirect('/admin');
});

module.exports = router;
