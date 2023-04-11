import axios from 'axios';

export const http = axios.create({
    
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        Accept: 'application/json',
        Content: 'application/json', 
    }

});

// Adiciona um interceptador na requisição
http.interceptors.request.use(function (config) {

    const token = localStorage.getItem('token');

    if(token && config.headers){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;

  }, function (error) {

    // Faz alguma coisa com o erro da resposta

    return Promise.reject(error);

});