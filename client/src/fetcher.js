import config from './config.json';

// const getUserExist = async (email, password) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/login/confirm?Email=${email}&Password=${password}`, {
//         method: 'GET',
//     })
//     return res.json()
// }


const getUserInfo = async (email, password) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/login/getInfo?Email=${email}&Password=${password}`, {
        method: 'GET',
    })
    return res.json()
}

const toSaveRecipe = async (recipeID, userID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/login/getInfo?recipeID=${recipeID}&userID=${userID}`, {
        method: 'GET',
    })
    return res.json()
}

const toGetSaved = async (userID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getSaved?userID=${userID}`, {
        method: 'GET',
    })
    return res.json()
}

export {
    getUserInfo,
    toSaveRecipe,
    toGetSaved
}

