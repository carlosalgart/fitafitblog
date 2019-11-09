const Hapi = require('@hapi/hapi');

const {Sequelize, Model, DataTypes }  =require('sequelize');
//const sequelize = new Sequelize('sqlite.blog.sqlite');
const sequelize = new Sequelize('fitafitblog','root','', {
    dialect: 'mysql',
    port: 3307
});//




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
        return data;
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

//inserir o sync de tabelas antes do server.start()
//...


try{
 await sequelize.sync();
 Post.bulkCreate(data);
}catch(error){
     throw new Error(error);
 }


await sequelize.start();

await server.start();
console.log('Server running on %s', server.info.uri);

};
process.on('unhandledRejecion', (err) =>{
    console.log(err);
    process.exit(1); 
} )

init();