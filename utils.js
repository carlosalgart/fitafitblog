exports.checaIdade = (idade, sleep = 2000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => idade >= 18 ? resolve(true) : reject(false), sleep);
    }); 
};