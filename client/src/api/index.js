import axios from 'axios';

const API_URL = "http://localhost:5001/";

export async function callPostApi({ url, body, headers }) {
  try {

    let authHeader = localStorage.getItem('authorization')
      ? { authorization: localStorage.getItem('authorization') }
      : {};

    const result = await axios({
      url: API_URL + url,
      method: 'POST',
      headers: { ...authHeader, ...headers },
      data: body,
      timeout: 120000,
    });

    return result;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
  }
}

// GET request
export async function callGetApi({ url, headers, id }) {
  try {
    
    let authHeader = localStorage.getItem('authorization')
      ? { authorization: localStorage.getItem('authorization') }
      : {};

    if (id) {
      url = url.replace(/\/([^\/]*)$/, `/${id}`);
    }

    const result = await axios({
      url: API_URL + url,
      method: 'GET',
      headers: { ...authHeader, ...headers },
      timeout: 120000,
    });

    return result;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
  }
}

