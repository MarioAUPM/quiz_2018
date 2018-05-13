const path = require('path');

const Sequelize = require('sequelize');
const sequelize  = new Sequelize("sqlite:quiz.sqlite");
sequelize.import(path.join(__dirname,'quiz'));
sequelize.import(path.join(__dirname,'session'));

sequelize.sync()
.then(() => console.log('Data Bases created succesfully'))
.catch(error => {
    console.log('Error creating the data base tables: ', error);
    process.exit(1);
});

module.exports = sequelize;