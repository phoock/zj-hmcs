import React from 'react';
import { Card, Input, Select, DatePicker, Upload, message, Button, Icon, Modal, Checkbox, InputNumber  } from 'antd';
const Option = Select.Option
const { TextArea } = Input;
import moment from 'moment';
const { RangePicker } = DatePicker;
import axios from 'axios'

//导入工具函数
import HM from 'util/hmcs.js'
let HMutil = new HM()


class PlaningAdd extends React.Component{
  constructor(props){
    super(props)
    let propsN = this.props.match.params.info
    let proName = propsN.split('&')[0]
    let proId = propsN.split('&')[1]
    this.state = {
      //储存项目名字和项目id
      proName : proName,
      proId : proId,
      jiansheCompony : [],

      //上传需要的属性
      fileNum: 3,
      fileList: [],
      uploading: false,
      uploadUrl: '/api/Project/JsonInsertProInfo',

      FlowID : 1,
      ProName : proName,
      PROTYPE : '1',
      LANDTYPE : 'A',
      PROSTATUS : '1',
      PROADDRESS : '',
      PROSCAL : '',
      PROSTARTDATE : '',
      PROENDDATE : '',
      MONEYFROM : '',
      PROPRICE : '',
      SOILTYPE : '1-砂土',
      INFILTRATION : '',
      NOPERMEABLE : '',
      RUNOFF : '',
      PROSHOW : 0,
      CONSTRUCTION : '1',
      ANNUALRUNOFFONE : '',
      GREENONE : '',
      RAINWATERONE : '',
      REGENERATIONONE : '',
      POLLUTIONCONTROLONE : '',
      ECOLOGICALONE : '',
      CONTAMINANTSONE : '',
      PROTARGET : ''
    }
  }
  componentDidMount(){
    
    //加载建设单位
    axios.post('/api/Account/JsonGetDevorgInfo',{USERTYPE:3,EMPDEPART:"6+"})
    .then(res=>{

      if(res.status === 200 && res.data.Data){
        //转义json
        let dataArr = JSON.parse(res.data.Data)
        //处理数据
        let result = this.handleJiansheArr(dataArr)
        this.setState({
          jiansheCompony : result,
          CONSTRUCTION : result[0].componyKey
        })
      }
      else {
        console.log('加载建设单位过程中,没有返回值,或者接口错误');
      }
    })
    .catch(()=>{
      console.log('加载建设单位过程中出现问题');
    })
  }
  //处理建设单位arr
  handleJiansheArr(arr){
    let newArr = []
    arr.map(v=>{
      newArr.push({
        componyKey: v.USERSN,
        componyValue: v.USERNAME
      })
    })
    return newArr
  }
  //表单提交
  handleSubmit(){
    const {
      fileList,
      FlowID,
      ProName,
      PROTYPE,
      LANDTYPE,
      PROSTATUS,
      PROADDRESS,
      PROSCAL,
      PROSTARTDATE,
      PROENDDATE,
      MONEYFROM,
      PROPRICE,
      SOILTYPE,
      INFILTRATION,
      NOPERMEABLE,
      RUNOFF,
      PROSHOW,
      CONSTRUCTION,
      ANNUALRUNOFFONE,
      GREENONE,
      RAINWATERONE,
      REGENERATIONONE,
      POLLUTIONCONTROLONE,
      ECOLOGICALONE,
      CONTAMINANTSONE,
      PROTARGET } = this.state;
    const formData = new FormData();
    fileList.forEach((file,index) => {
      formData.append(`file_${index+1}`, file);
    });

    let objParams={
      FlowID:FlowID,
      ProName:ProName,
      PROTYPE:PROTYPE,
      LANDTYPE:LANDTYPE,
      PROSTATUS:PROSTATUS,
      PROADDRESS:PROADDRESS,
      PROSCAL:PROSCAL,
      PROSTARTDATE:PROSTARTDATE,
      PROENDDATE:PROENDDATE,
      MONEYFROM:MONEYFROM,
      PROPRICE:PROPRICE,
      SOILTYPE:SOILTYPE,
      INFILTRATION:INFILTRATION,
      NOPERMEABLE:NOPERMEABLE,
      RUNOFF:RUNOFF,
      PROSHOW:PROSHOW,
      CONSTRUCTION:CONSTRUCTION,
      ANNUALRUNOFFONE:ANNUALRUNOFFONE,
      GREENONE:GREENONE,
      RAINWATERONE:RAINWATERONE,
      REGENERATIONONE:REGENERATIONONE,
      POLLUTIONCONTROLONE:POLLUTIONCONTROLONE,
      ECOLOGICALONE:ECOLOGICALONE,
      CONTAMINANTSONE:CONTAMINANTSONE,
      PROTARGET:PROTARGET,
      fileList:fileList
    }

    //表单信息验证
    let valiResult = this.validate(objParams)
    if(valiResult.result){
    } else {
      message.error(valiResult.message)
      return
    }

    //添加数据并设置uploading为true
    for(let k in objParams){
      formData.append(k,objParams[k])
    }
    this.setState({
      uploading: true,
    });

    //使用axios开始上传
    axios.post(this.state.uploadUrl,formData)
    .then((res)=>{

      if(res.data.isSuccessful){
        message.success('上传成功')
        this.setState({
          uploading: false
        },()=>{
          this.props.history.push('/project-planing/list')
        })

      }
      else if(!res.data.isSuccessful) {
        return Promise.reject('上传失败')
      }
    })
    .catch(()=>{
      //处理错误情况
      message.error('发生错误')
      this.setState({
        uploading: false
      })
    })
  }
  validate(obj){
    let valiResult = {}
    //验证项目类型
    if(!obj.PROTYPE){
      valiResult.result = false
      valiResult.message = '请选择项目类型'
      return valiResult
    }

    //验证项目地址
    if(!obj.PROADDRESS){
      valiResult.result = false
      valiResult.message = '请填写项目地址'
      return valiResult
    }
    //验证项目规模
    if(!obj.PROSCAL){
      valiResult.result = false
      valiResult.message = '请填写项目规模'
      return valiResult
    }
    //验证项目时间
    if(!obj.PROENDDATE){
      valiResult.result = false
      valiResult.message = '请选择项目时间'
      return valiResult
    }
    //验证资金来源
    if(!obj.MONEYFROM){
      valiResult.result = false
      valiResult.message = '请填写资金来源'
      return valiResult
    }
    //验证项目投资
    if(!obj.PROPRICE){
      valiResult.result = false
      valiResult.message = '请填写项目投资'
      return valiResult
    }
    //验证渗透系数
    if(!obj.INFILTRATION){
      valiResult.result = false
      valiResult.message = '请填写渗透系数'
      return valiResult
    }
    //验证渗透系数
    if(!obj.INFILTRATION){
      valiResult.result = false
      valiResult.message = '请填写渗透系数'
      return valiResult
    }
    //验证不渗透系数
    if(!obj.NOPERMEABLE){
      valiResult.result = false
      valiResult.message = '请填写不渗透系数'
      return valiResult
    }
    //验证径流系数
    if(!obj.RUNOFF){
      valiResult.result = false
      valiResult.message = '请填写径流系数'
      return valiResult
    }
    //验证年径流控制率
    if(!obj.REGENERATIONONE){
      valiResult.result = false
      valiResult.message = '请填写年径流控制率'
      return valiResult
    }
    //验证生态岸线(大于)
    if(!obj.ECOLOGICALONE){
      valiResult.result = false
      valiResult.message = '请填写生态岸线(大于)'
      return valiResult
    }
    //验证面源污染控制(大于)
    if(!obj.POLLUTIONCONTROLONE){
      valiResult.result = false
      valiResult.message = '请填写面源污染控制(大于)'
      return valiResult
    }
    //验证污水再生(大于)
    if(!obj.ANNUALRUNOFFONE){
      valiResult.result = false
      valiResult.message = '请填写污水再生(大于)'
      return valiResult
    }
    //验证雨水资源利用率
    if(!obj.RAINWATERONE){
      valiResult.result = false
      valiResult.message = '请填写雨水资源利用率'
      return valiResult
    }
    //验证绿地率
    if(!obj.GREENONE){
      valiResult.result = false
      valiResult.message = '请填写绿地率'
      return valiResult
    }
    //验证fileList
    if(!obj.fileList.length>0){
      valiResult.result = false
      valiResult.message = '请上传文件'
      return valiResult
    }
    valiResult.result = true
    valiResult.message = '通过验证'
    return valiResult
  }
  handleInputChange(e,key){
    this.setState({
      [key] : e.target.value
    })
  }
  handleInputNumChange(e,key){
    console.log(e,key);
    if(typeof e === 'number'){
      this.setState({
        [key] : e,
      })
    }
  }
  handleSelectChange(e,key){
    console.log(e);
    this.setState({
      [key]:e
    })
  }
  handleCheckboxChange(e,key){
    let value = e.target.checked?1:0;
    this.setState({
      [key] : value
    })
  }
  handleDateChange(moment,dateString){
    console.log(dateString);
    this.setState({
      PROSTARTDATE : dateString[0],
      PROENDDATE : dateString[1]
    })
  }
  render(){
    const {  uploading, fileNum, uploadUrl, proName, jiansheCompony } = this.state

    const props = {
      name: 'file',
      action: uploadUrl,
      headers: {
        authorization: 'authorization-text',
      },
      beforeUpload:function(file,filtTotal){
        return false
      }.bind(this),
      onChange:function(info){
        //如果info.fileList.length>1 则pop()掉一个,并
        let fileArr = this.state.fileList
        if(info.fileList.length>1){
          //删掉一个
          info.fileList = info.fileList.pop()
          //同时在state里删掉最后一个
          let fileState = this.state.fileList
          fileState.pop()
          this.setState({
            fileList : fileState
          },()=>{
            //删除掉最后一个后添加一个新的file
            this.setState(({fileList})=>({
              fileList : [...fileList,info.file]
            }))
          })
        } else {
          //如果是第一次添加数据
          this.setState(({fileList})=>({
            fileList : [...fileList,info.file]
          }))
        }
      }.bind(this),
      onRemove:function(file){
        return false
      }.bind(this)
    }


    return (
      <div className="stepinfo-wrap" style={{marginTop:16}}>
        <Card title={`${this.state.proName}`}>
          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>项目名称</label></div>
            <div className="col-md-4"><Input value={`${proName}`} readOnly/></div>
            <div className="col-md-4">
              <Select defaultValue="default" style={{ width: 160 }}>
                <Option value="default">划拔类项目</Option>
              </Select>
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>项目类型</label></div>
            <div className="col-md-4">
              <Select defaultValue="1" onChange={(e)=>this.handleSelectChange(e,"PROTYPE")} style={{ width: 160 }}>
                <Option value="1">源头</Option>
                <Option value="2">过程</Option>
                <Option value="3">末端</Option>
                <Option value="4">水体</Option>
              </Select>
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>地块类型</label></div>
            <div className="col-md-4">
              <Select defaultValue="A" onChange={(e)=>this.handleSelectChange(e,"LANDTYPE")} style={{ width: 160 }}>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
                <Option value="D">D</Option>
              </Select>
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>项目状态</label></div>
            <div className="col-md-4">
              <Select defaultValue="1" onChange={(e)=>this.handleSelectChange(e,"PROSTATUS")} style={{ width: 160 }}>
                <Option value="1">新建</Option>
                <Option value="2">已完成规划</Option>
                <Option value="3">正在设计</Option>
                <Option value="4">已完成设计</Option>
                <Option value="5">正在施工</Option>
                <Option value="6">已完成施工</Option>
                <Option value="7">移交管养</Option>
              </Select>
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>项目地址</label></div>
            <div className="col-md-4"><Input onChange={(e)=>this.handleInputChange(e,"PROADDRESS")} /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>项目规模</label></div>
            <div className="col-md-3"><InputNumber onChange={(e)=>this.handleInputNumChange(e,"PROSCAL")} /><span style={{marginLeft:16}}>(请输入数字)</span></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>起始~结束时间</label></div>
            <div className="col-md-6">
              <RangePicker
                allowClear={false}
                placeholder={['项目开始时间', '项目结束时间']}
                onChange={(moment,dateString)=>this.handleDateChange(moment,dateString)}
              />
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>资金来源</label></div>
            <div className="col-md-4"><Input onChange={(e)=>this.handleInputChange(e,"MONEYFROM")}   /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>项目投资</label></div>
            <div className="col-md-2"><Input onChange={(e)=>this.handleInputChange(e,"PROPRICE")}  addonAfter={<div>万元</div>}/></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>土壤类型</label></div>
            <div className="col-md-4">
              <Select defaultValue="1-砂土" style={{ width: 160 }} onChange={(e)=>this.handleSelectChange(e,"SOILTYPE")}>
                <Option value="1-砂土">砂土</Option>
                <Option value="2-黏土">黏土</Option>
                <Option value="3-砂砾">砂砾</Option>
                <Option value="4-卵石">卵石</Option>
                <Option value="5-软石">软石</Option>
                <Option value="6-次坚石">次坚石</Option>
                <Option value="7-坚石">坚石</Option>
              </Select>
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>渗透系数</label></div>
            <div className="col-md-2"><Input onChange={(e)=>this.handleInputChange(e,"INFILTRATION")} /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>不渗透系数</label></div>
            <div className="col-md-2"><Input onChange={(e)=>this.handleInputChange(e,"NOPERMEABLE")} /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>径流系数</label></div>
            <div className="col-md-2"><Input onChange={(e)=>this.handleInputChange(e,"RUNOFF")} /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>建设单位</label></div>
            <div className="col-md-4">
            {
              jiansheCompony.length>0?
              <Select style={{ width: 160 }} defaultValue={jiansheCompony[0].componyKey} onChange={(e)=>this.handleSelectChange(e,"CONSTRUCTION")}>
                {
                  jiansheCompony.map((v,index)=>(<Option key={index} value={v.componyKey}>{v.componyValue}</Option>))
                }

              </Select>
              :null
            }

            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>年径流控制率(大于)</label></div>
            <div className="col-md-2"><Input onChange={(e)=>this.handleInputChange(e,"REGENERATIONONE")} /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>年径流污染物去除率</label></div>
            <div className="col-md-2"><Input onChange={(e)=>this.handleInputChange(e,"CONTAMINANTSONE")} /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>生态岸线(大于)</label></div>
            <div className="col-md-2"><Input onChange={(e)=>this.handleInputChange(e,"ECOLOGICALONE")} /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>面源污染控制(大于)</label></div>
            <div className="col-md-2"><Input onChange={(e)=>this.handleInputChange(e,"POLLUTIONCONTROLONE")} /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>污水再生(大于)</label></div>
            <div className="col-md-2"><Input onChange={(e)=>this.handleInputChange(e,"ANNUALRUNOFFONE")} /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>雨水资源利用率(大于)</label></div>
            <div className="col-md-2"><Input onChange={(e)=>this.handleInputChange(e,"RAINWATERONE")} /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>绿地率(大于)</label></div>
            <div className="col-md-2"><Input onChange={(e)=>this.handleInputChange(e,"GREENONE")} /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>示范项目</label></div>
            <div className="col-md-2"><Checkbox onChange={(e)=>this.handleCheckboxChange(e,"PROSHOW")} /> </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>文件上传</label></div>
            <div className="col-md-3">
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 上传规划批复文件
                </Button>
              </Upload>
            </div>
          </div>




          <Card title = "项目概况" type="inner" style={{marginTop:16}}>
            <TextArea rows={12} />
          </Card>
          <div className="row" style={{marginTop:16}}>
            <Button
              style={{ marginTop: 16 }}
              type="primary"
              onClick={()=>this.handleSubmit()}
              loading={uploading}
            >
              {uploading ? '提交中' : '提交' }
            </Button>
          </div>
        </Card>
      </div>
    )
  }
}



export default PlaningAdd
