const Hapi = require('@hapi/hapi');

const data = [
    {
        id: 1,
        title: 'Novo post',
        content: 'Olá abigos, my the primeiro first post'        
    },
    {
        id: 2,
        title: 'Outro post',
        content: 'Oiiiiiiin gente'
    }
];




const init = async() => {
   const server = Hapi.server({
    port:3000,
    host: 'localhost'
});

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
        const post =  data.find(post => post.id == id );
        return post || {};
    }
});



await server.start();
console.log('Server running on %s', server.info.uri);

};
process.on('unhandledRejecion', (err) =>{
    console.log(err);
    process.exit(1); 
} )

init();