import React from 'react'
import LoadMxDrawX from './mscad.js'

class ShowFile extends React.Component{
  render(){
    return (
      <div>
        {
          this.props.url.search('.dwg')>=0
          ?<div>{
            LoadMxDrawX(`${this.props.url}`, "", "http://www.mxdraw.com/MxDrawX52.CAB#version=8.0.0.1", "http://www.mxcad.net:2080/MxChromex86Setup.exe")
          }</div>
          :<embed width={`100%`} style={{minHeight:'780px'}} src={this.props.url} />
        }
      </div>
    )
  }
}

export default ShowFile
