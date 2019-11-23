//const {checaIdade} = require('./utils');

//async function main(){
//    try{
//       await checaIdade(19); 
//       console.log('>18');
//    }
//    catch(error){
//        console.log('<18');
//    }
//}

//main();


console.log('src/index.js');
const Hapi = require('@hapi/hapi');

const {Sequelize, Model, DataTypes }  =require('sequelize');
//const sequelize = new Sequelize('sqlite.blog.sqlite');
const sequelize = new Sequelize('fitafitblog','root','', {
    dialect: 'mysql',
    port: 3307
});
const { CREATED, OK, NO_CONTENT } =  require('http-status');






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


class Post extends Model{}
Post.init({
title: DataTypes.STRING,
content: DataTypes.TEXT
}, {sequelize, modelName: 'post'})




server.route({
    method: 'GET',
    path: '/',
    handler: async(request, h) => {
        return 'Hello hapi';
    }
});

server.route({
    method: 'GET',
    path: '/posts',
    handler: async(request, h) => {
        return await Post.findAll();
    }
});

server.route({
    method: 'GET',
    path: '/posts/{id}',
    handler: async(request, h) => {
        const { id } = request.params;
        return await Post.findByPk(id);
      //  const post =  data.find(post => post.id === +id );
      //  return post || JSON.stringify('Erro') ;
    }
});
server.route({
    method: 'POST',
    path: '/posts',
    handler: async(request, h) => {
        const {payload} = request;        
        const post = await Post.create(payload);
        return h.response(post).code(CREATED);
    }
});

server.route({
    method: 'PUT',
    path: '/posts/{id}',
    handler: async(request, h) => {
        const { params: {id}, payload} = request;   
        await Post.update(payload, {where: {id}});
        const post = await Post.findByPk(id);
        
        return h.response(post).code(OK);
    }
});

server.route({
    method: 'DELETE', 
    path: '/posts/{id}',
    handler: async(request, h) => {
        const { id } = request.params;   
        await Post.destroy({where: {id}});
        //const post = await Post.findByPk(id);
        
        return h.response().code(NO_CONTENT);
    }
});
//inserir o sync de tabelas antes do server.start()
//...


try{
 await sequelize.sync();
 Post.bulkCreate(data);
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