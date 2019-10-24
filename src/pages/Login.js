import React, { useState } from 'react'

import SearchUser from '../components/search-user'

export default function Login ({ history }) {

  return ( 
    <div className="login-container">
      <SearchUser history={history} />
    </div>   
  )
}