import React from 'react'
import {Link} from 'react-router-dom'

export default function Logout() {
  return (
    <>
    <li>
      <Link to="#" class="button gray">
        <img src="./assets/icon-login.svg" alt="" />
        <span>Login</span>
      </Link>
    </li>
    <li class="only-pc">
      <Link to="#" class="button gray">
        <img src="./assets/icon-register.svg" alt="" />
        <span>Register</span>
      </Link>
    </li>
    </>
  )
}