const Hapi = require('@hapi/hapi');

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

await server.start();
console.log('Server running on %s', server.info.uri);

};
process.on('unhandledRejecion', (err) =>{
    console.log(err);
    process.exit(1); 
} )

init();