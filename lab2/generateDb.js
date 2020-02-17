var Materials = require('./db').Materials;
var Buildings = require('./db').Buildings;
var Projects = require('./db').Projects;

var materials = ['кирпич', 'дерево', 'железобетон', 'газоблок'];
var buildings = ['басейн', 'баня', 'гараж', 'веранда', 'гостевой дом'];
var projects = [
    {
        name: 'Z100',
        body: 'Описание проекта',
        levels: 2,
        materialId: 1,
        square: 100,
        picture: '123',
        buildings: [1, 2]
    },
    {
        name: 'Z200',
        body: 'Описание другого проекта',
        levels: 1,
        materialId: 2,
        square: 70,
        picture: '123',
        buildings: [3, 4, 5]
    }
];

materials.map(material => {
    Materials.create({
        name: material
    }).then(res=>{
        console.log(res);
    }).catch(err=>console.log(err));
});

buildings.map(building => {
    Buildings.create({
        name: building
    }).then(res=>{
        console.log(res);
    }).catch(err=>console.log(err));
});

projects.map(project => {
    Projects.create(project).then(_project => {
        _project.setBuildings(project.buildings);
    }).catch(err=>console.log(err));
});
