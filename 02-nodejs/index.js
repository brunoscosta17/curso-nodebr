/* 
0 - Obter um usuário
1 - Obter o número de telefone de um usuário a partir de seu ID
2 - Obter o endereço do usuário pelo ID
*/
//import de um modulo interno do node.js
const util = require('util');
const getAddressAsync = util.promisify(getAddress);

function getUser() {
    // quando der algum problema -> reject
    // quando success -> resolve
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            // return reject(new Error('DEU RUIM DE VERDADE!'))
            return resolve({
                id: 1,
                name: 'Aladin',
                birth: new Date()
            })
        }, 1000)
    });
};

function getPhone(idUser) {
    return new Promise(function resolvePromise(resolve, reject) {        
        setTimeout(function () {
            return resolve({
                phoneNumber: '9 9929 1047',
                ddd: 34
            })
        }, 2000)
    })
};

// para manipular o sucesso, usa-se a função .then
// para manipular o erro, usa-se o .catch
const userPromise = getUser();
userPromise
    .then(function (user) {
        return getPhone(user.id)
            .then(function resolvePhone(result) {
                return {
                    user: {
                        name: user.name,
                        id: user.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultUser) {
        const address = getAddressAsync(resultUser.user.id);
        return address.then(function resolveAddress(result){
            return {
                user: resultUser.user,
                phone: resultUser.telefone,
                address: result
            }
        });
    })
    .then(function (result) {
        console.log(`
            Nome: ${result.user.name},
            Endereço: ${result.address.street}, número ${result.address.number},
            Telefone: (${result.phone.ddd}) ${result.phone.phoneNumber}
        `);
    }).catch(function (error) {
        console.error('DEU RUIM',error);
    })

function getAddress(idUser, callback) {
    setTimeout(() => {
        return callback(null, {
            street: 'dos Bobos',
            number: 0
        })
    }, 2000);
};

// getUser(function resolveUser(error, user) {
//     // null || "" || 0 === false
//     if (error) {
//         console.error('DEU RUIM EM USUARIO!', error);
//         return;
//     }
//     getPhone(user.id, function resolvePhone(error1, phoneNumber) {
//         if (error1) {
//             console.error('DEU RUIM EM TELEPHONE!', error1);
//             return;
//         }
//         getAddress(user.id, function resolveAddress(error2, address) {
//             if (error2) {
//                 console.error('DEU RUIM EM ENDEREÇO!', error2);
//                 return;
//             }
//             console.log(`
//                 Nome: ${user.name},
//                 Endereço: ${address.street}, ${address.number},
//                 Telefone: ${phoneNumber.ddd} - ${phoneNumber.phoneNumber}`)
//         })
//     });
// });