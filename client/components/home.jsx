import React from 'react'
import Head from './head'
import Login from './login'


const Home = () => {

  return (
    <div>
      <Head title="Dashboard" />
      <Login />
    </div>
  )
}

Home.propTypes = {}

export default Home
