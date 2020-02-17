const Sequelize = require("sequelize");

const sequelize = new Sequelize('mysql://root:@localhost:3306/z500_sequelize', {});
sequelize
    .authenticate()
    .then(() => {
        console.log('Соединение установлено.');
    })
    .catch(err => {
        console.error('Ошибка соединения:', err);
    });

const Projects = sequelize.define("projects", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    levels: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    square: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    picture: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Materials = sequelize.define("materials", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
Materials.hasMany(Projects);

const Buildings = sequelize.define("buildings", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const ProjectsBuildings = sequelize.define("projectsBuildings", {});

Projects.belongsToMany(Buildings, {through: ProjectsBuildings});
Buildings.belongsToMany(Projects, {through: ProjectsBuildings});

sequelize.sync({force: true}).then(result=>{
    console.log(result);
    var generateDb = require('./generateDb');
}).catch(err=> console.log(err));

module.exports.db = sequelize;
module.exports.Materials = Materials;
module.exports.Buildings = Buildings;
module.exports.Projects = Projects;