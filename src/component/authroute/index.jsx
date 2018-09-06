import React from 'react'

import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class Authroute extends React.Component{
  componentDidMount(){
    axios.get('/api/Account/AuothLogin').then((res)=>{
      if(res.status===200 && res.data.isSuccessful){
        window.a_phoock_dpt = res.data.Data.EMPDEPART.substring(2)
      }else{
        this.props.history.push('/login')
      }
    })
  }
  render(){
    return null
  }
}
export default Authroute
