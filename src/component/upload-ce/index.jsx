import React from 'react'

class UploadCe extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fileNameArr : this.props.fileNameArr || ['上传文件名称']
      fileNum : this.props.fileNum || 1,
      fileList : []
    }
  }

  //判断button是否可用
  buttonDisabled(num){
    let { fileList } = this.state
    let result = true
    for(let k = 1; k < num ; k++){
      if(fileList[k]){
        result = false
      } else {
        result = true
      }
    }
    return result
  }

  render(){
    return (
      <div>123</div>
    )
  }
}

export default UploadCe
