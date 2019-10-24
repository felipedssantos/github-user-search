import React, { useState } from 'react'

import api from '../services/api'

/* Componente responsavel por buscar usuários no GitHub */
export default function SearchUser({ match, history }) {

  const [username, setUsername] = useState([])
  /* Define variavel que receberá os dados do usuário */

  async function handleSubmit(event) {
    event.preventDefault()
    
    /* consulta a API do GitHub */
    const response = await api.get('/users/' + username)

    /** envia o usuário para a proxima tela com os dados do usuario */
    history.push(response.data.login)
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input 
            type="text"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário do GitHub" val={username} />

          <div className="input-group-append">
            <button type="submit" ><i className="icon-search"></i></button>
          </div>
        </div>
      </form>
    </div>
  )

 }


