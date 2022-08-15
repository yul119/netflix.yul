import axios from 'axios';

//////// Auth routes ///////////////
export const authAPIs = {
  apiRegister: async (userName, email, password) => {
    const res = await axios.post('/auth/register', {
      userName,
      email,
      password,
    });
    return res;
  },
  apiActivationEmail: async (activationToken) => {
    const res = await axios.post('/auth/activation', {
      activationToken,
    });
    return res;
  },
  apiLogin: async (email, password) => {
    const res = await axios.post('/auth/login', {
      email,
      password,
    });
    return res;
  },
  apiGetAccessToken: async () => {
    const res = await axios.post('/auth/refresh', null);
    return res;
  },
  apiLogout: async () => {
    await axios.get('auth/logout');
  },
  apiForgotPass: async (email) => {
    const res = await axios.post('/auth/re-send-password', {
      email,
    });
    return res;
  },
  apiResetPass: async (password, accessToken) => {
    const res = await axios.post(
      '/auth/change-password',
      { password },
      {
        headers: { Authorization: accessToken },
      }
    );
    return res;
  },
  apiGoogleLogin: async (tokenId) => {
    const res = await axios.post('/auth/google-login', {
      tokenId,
    });
    return res;
  },
};

//////// User routes //////////////

export const userAPIs = {
  apiFetchUser: async (token) => {
    const res = await axios.get('/user/infor', {
      headers: { Authorization: token },
    });
    return res;
  },
};

export const listAPIs = {
  getList: async (type, genre) => {
    const res = axios.get(
      `/list${type ? '?type=' + type : ''}${
        genre ? '&genre=' + genre : ''
      }`
    );

    return res;
  },
};

export const movieAPIs = {
  getMovieById: async (id) => {
    const res = await axios.get(`/movie/find/${id}`);
    return res;
  },
  getRandomMovie: async (type) => {
    const res = await axios.get(
      `/movie/random${type ? '?type=' + type : ''}`
    );
    return res;
  },
};
