import axios from 'axios';

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL: baseURL }, options));
  return instance;
}

console.log('MODE:', import.meta.env.MODE); // MODE: development
console.log('VITE_BASE_URL:', import.meta.env.VITE_API_BASE_URL);

export const canvases = create(`${import.meta.env.VITE_API_BASE_URL}/canvases`);
// export const canvases = create('https://json-server-vercel-6yu8.vercel.app/canvases');

// https://json-server-vercel-6yu8.vercel.app/canvases
// http://localhost:8000/canvases/
