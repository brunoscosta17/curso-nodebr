/* 
0 - Obter um usuário
1 - Obter o número de telefone de um usuário a partir de seu ID
2 - Obter o endereço do usuário pelo ID
*/

function getUser(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            name: 'Aladin',
            birth: new Date()
        })
    }, 1000)
};

function getPhone(idUser, callback) {
    setTimeout(function () {
        return callback(null, {
            phoneNumber: '9 9929 1047',
            ddd: 34
        })
    }, 2000)
};

function getAddress(idUser, callback) {
    setTimeout(() => {
        return callback(null, {
            street: 'dos Bobos',
            number: 0
        })
    }, 2000);
};

function resolveUser(error, user) {
    console.log("user", user);
}

getUser(function resolveUser(error, user) {
    // null || "" || 0 === false
    if (error) {
        console.error('DEU RUIM EM USUARIO!', error);
        return;
    }
    getPhone(user.id, function resolvePhone(error1, phoneNumber) {
        if (error1) {
            console.error('DEU RUIM EM TELEPHONE!', error1);
            return;
        }
        getAddress(user.id, function resolveAddress(error2, address) {
            if (error2) {
                console.error('DEU RUIM EM ENDEREÇO!', error2);
                return;
            }
            console.log(`
                Nome: ${user.name},
                Endereço: ${address.street}, ${address.number},
                Telefone: ${phoneNumber.ddd} - ${phoneNumber.phoneNumber}`)
        })
    });
});