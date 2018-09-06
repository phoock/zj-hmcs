import React from 'react'
import { Icon } from 'antd'
import { withRouter } from 'react-router-dom'

//导入划拨类7个步骤
import HuaStep01 from '../hua-step01/index.jsx'
import HuaStep02 from '../hua-step02/index.jsx'
import HuaStep03 from '../hua-step03/index.jsx'
import HuaStep04 from '../hua-step04/index.jsx'
import HuaStep05 from '../hua-step05/index.jsx'
import HuaStep06 from '../hua-step06/index.jsx'
import HuaStep07 from '../hua-step07/index.jsx'
import HuaStep08 from '../hua-step08/index.jsx'
import HuaStep09 from '../hua-step09/index.jsx'

//导入出让类6个步骤
import ChuStep02 from '../chu-step02/index.jsx'
import ChuStep03 from '../chu-step03/index.jsx'
import ChuStep04 from '../chu-step04/index.jsx'
import ChuStep05 from '../chu-step05/index.jsx'
import ChuStep06 from '../chu-step06/index.jsx'
import ChuStep07 from '../chu-step07/index.jsx'
import ChuStep08 from '../chu-step08/index.jsx'

@withRouter
class StepTransfer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      projectName:''
    }
  }
  componentDidMount(){
    let baseInfoStr = this.props.match.params.id
    let baseInfoArr = baseInfoStr.split('&')
    let baseInfoName = baseInfoArr[0]
    this.setState({
      projectName:baseInfoName
    })
  }
  successAdd(){
    this.props.nowStep += 1
  }
  render(){
    const huaboEle = ()=>{
      switch (this.props.nowStep) {
        case 1: return <HuaStep02 projectName={this.state.projectName} {...this.props}/>
        case 2: return <HuaStep03 projectName={this.state.projectName} {...this.props}/>
        case 3: return <HuaStep04 projectName={this.state.projectName} {...this.props}/>
        case 4: return <HuaStep05 projectName={this.state.projectName} {...this.props}/>
        case 5: return <HuaStep06 projectName={this.state.projectName} {...this.props}/>
        case 6: return <HuaStep07 projectName={this.state.projectName} {...this.props}/>
        case 7: return <HuaStep08 projectName={this.state.projectName} {...this.props}/>
        default: return ( <div>貌似出了点问题 </div>)
      }
    }
    const churangEle = ()=>{
      switch (this.props.nowStep) {
        case 1: return <HuaStep01 {...this.props}/>
        case 2: return <ChuStep02 {...this.props}/>
        case 3: return <ChuStep03 {...this.props}/>
        case 4: return <ChuStep04 {...this.props}/>
        case 5: return <ChuStep05 {...this.props}/>
        case 6: return <ChuStep06 {...this.props}/>
        case 7: return <ChuStep07 {...this.props}/>
        case 8: return <ChuStep08 {...this.props}/>
        default: return ( <div>貌似出了点问题 </div>)
      }
    }
    return (
      <div>
        {
          this.props.type === 'huabo'
          ?huaboEle()
          :churangEle()
        }
      </div>

    )
  }
}

export default StepTransfer
