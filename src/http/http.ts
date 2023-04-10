import axios from 'axios';

export const http = axios.create({
    
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        Accept: 'application/json',
        Content: 'application/json', 
    }

});

// Adiciona um interceptador na resposta
http.interceptors.response.use(function (response) {

    // Faz alguma coisa com os dados de resposta
    return response;

  }, function (error) {

    // Faz alguma coisa com o erro da resposta

    return Promise.reject(error);

});