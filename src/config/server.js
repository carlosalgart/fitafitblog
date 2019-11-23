
console.log('src/config/server.js');

import Hapi from '@hapi/hapi';
import {Sequelize, Model, DataTypes }  from 'sequelize';
import { CREATED, OK, NO_CONTENT } from 'http-status';

//const sequelize = new Sequelize('sqlite.blog.sqlite');
const sequelize = new Sequelize('fitafitblog','root','', {
    dialect: 'mysql',
    port: 3307
});







const data = [
    {
        title: 'Novo post',
        content: 'Olá abigos, my the primeiro first post'        
    },
    {    
        title: 'Outro post',
        content: 'Oiiiiiiin gente'
    }
];




const init = async() => {
   const server = Hapi.server({
    port:3000,
    host: 'localhost'
});

await server.register([
    {
        plugin: require('hapi-sequelizejs'),
        options: [
            {
                name: 'fitafitblog',
                models: ['src/api/**/**models.js'],
                sequelize,
                sync: true
            }

        ]
    },

    {
    plugin: require('hapi-router'),
    options: { 
            routes: 'src/api/**/**.routes.js',
            controllers: 'src/api/**/**.controllers.js'
         }
       
}]);



// class Post extends Model{}
// Post.init({
// title: DataTypes.STRING,
// content: DataTypes.TEXT
// }, {sequelize, modelName: 'post'})





//inserir o sync de tabelas antes do server.start()
//...


try{
 await sequelize.sync();
 //Post.bulkCreate(data);
}catch(error){
     throw new Error(error);
 }


//await sequelize.start();

await server.start();
console.log('Server running on %s', server.info.uri);

};
process.on('unhandledRejecion', (err) =>{
    console.log(err);
    process.exit(1); 
} )

init();