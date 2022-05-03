import config from './config.json';

export const getUserExist = async (email, password) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/login/confirm?Email=${email}&Password=${password}`, {
    method: 'GET',
  });
  return res.json();
};
