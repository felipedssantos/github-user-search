import React, { useEffect, useState } from 'react'

import SearchUser from '../components/search-user'

/* Componente com a busca por usuários */
import FormatNumber from '../services/formatNumber'

import api from '../services/api'


export default function Main({ match, history }) {


  const username = match.params.username;

   /* Define variavel que receberá os dados do usuário */
  const [user, setUser] = useState([])

  /* Define variaveis que receberá as informações de repositório do usuário */
  const [repos, setRepos] = useState([])
  
  const [totalStars, setTotalStars] = useState(0)


  useEffect(() => {

    /* Função para carregar os repositórios dos usuários do GitHub */
    async function loadRepos() {
      const responseRepos = await api.get('/users/' + username + '/repos')


      setRepos(responseRepos.data)

      console.log(responseRepos.data);

      let repoStars = []

      for (let index = 0; index < responseRepos.data.length; index++) {
        const item = responseRepos.data[index];
        repoStars.push(item.stargazers_count)
      }

      setTotalStars(repoStars.reduce((a,b) => a + b))

    }

    /* Função para carregar os dados do usuário do GitHub */
    async function loadUser() {
      const responseUser = await api.get('/users/' + username)

      // console.log(responseUser.data)

      setUser(responseUser.data)
    }

    loadUser()
    loadRepos()
  }, [username])


  return (
    <div className="user-container">
      <div className="container">
        <div className="row">
          <div className="col">
            <SearchUser username={username} history={history} /> 
          </div>
        </div>
        <div className="row user-box">
          <div className="col-sm-3">
            <div className="user-profile">
              <img className="rounded shadow-sm img-responsive img-fluid" src={ user.avatar_url } alt={ user.name } />
              <h2>{ user.name }</h2>
              <h4>{ user.login }</h4>
              <div className="user-info">
                <p> <i className="icon-teamwork"></i> { user.company }</p>
                <p> <i className="icon-solar-system"></i> { user.location }</p>
                <p> <i className="icon-star"></i> { FormatNumber(totalStars) }</p>
                
                <p> <i className="icon-box"></i> { FormatNumber(repos.length) }</p>

                <p> <i className="icon-users"></i> { FormatNumber(user.followers) }</p>
              </div>
            </div>
          </div>
          <div className="col-sm-9">
          { repos.length > 0 ? (
            <ul className="list-unstyled repos-info">
            {repos.sort((a, b) => b.stargazers_count - a.stargazers_count).map(repo => (
              <li key={repo.id}>
                <div className="row">
                  <div className="col-12">
                    <h2>
                      <a href={repo.html_url} target="_blank" >{ repo.name }</a>
                    </h2>
                    <p>{ repo.description }</p>
                    <p>
                    <i className="icon-star"></i> <small>{ repo.stargazers_count }</small>
                    </p>
                  </div>
                </div>
              </li>
            ))}
            </ul>
          ) : <h1>Oops.. este usuário não possui repositórios ou não são públicos</h1>  }
          </div>
        </div>
      </div>
    </div>
  )
}