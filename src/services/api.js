import axios from 'axios'

/* Base para consulta a API do GitHub */
const api = axios.create({ 
  baseURL: 'https://api.github.com'
 })

 export default api