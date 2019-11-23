const {checaIdade} = require('./utils');

async function main(){
    try{
       await checaIdade(19); 
       console.log('>18');
    }
    catch(error){
        console.log('<18');
    }
}

main();