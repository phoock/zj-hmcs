import React from 'react'
import {Alert} from 'antd'

class NoData extends React.Component {
    render() {
      return (
        <div className='no-data'>
            <div className="row" style={{marginTop: 16,marginBottom: 16}}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <Alert message="暂无数据" type="warning"/>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
      )
    }
}

export default NoData
