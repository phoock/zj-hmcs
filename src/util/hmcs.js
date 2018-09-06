class HM {
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: res => {
                  if(res.isSuccessful){
                    resolve(res.Data, res.msg)
                  }else if(!res.isSuccessful){
                    //没有登录状态,强制登录
                    this.doLogin()
                  }
                },
                error: err => {
                  reject(err.statusText)
                }
            })
        });

    }
    doLogin(){
      window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }

    //获取url参数
    getUrlParam(name){
      //url参数  xxxx.com?param=123&param1=456
      let queryString = window.location.search.split('?')[1] || '';
      let reg = new RegExp("(^|&)" + name + "=([^&]*)" + "(&|$)");
      let result = queryString.match(reg);
      return result ? decodeURIComponent(result[2]) : null

    }

    //错误提示
    errorTips(errMsg){
      alert(errMsg || '好像哪里不对了')
    }
    //成功提示
    successTips(msg){
      alert(msg || '操作成功')
    }

    //localStorage存储
    setStorage(name, data){
      let dataType = typeof data
      //json对象
      if(dataType === 'object'){
        window.localStorage.setItem(name, JSON.stringify(data))
      }
      //基础类型
      else if(['number','string','boolean'].indexOf(dataType) >=0){
        window.localStorage.setItem(name, data)
      }
      //其他类型
      else{
        alert('该类型不能用于本地存储')
      }
    }

    //localStorage 取出
    getStorage(name){
      let data = window.localStorage.getItem(name);
      if(data){
        return JSON.parse(data)
      }
      else{
        return ''
      }
    }

    //localStorage 删除
    removeStorage(name){
      window.localStorage.removeItem(name)
    }

    //处理时间格式
    handleTimeFormate(data){
      return data.substr(0,10).split('-').join('/')
    }

    //处理图片url
    handleImgUrl(urlStr,moduleId,proId){
      //去除末尾的|
      let str = urlStr.split('|').filter(v=>v)
      return str.map(v=>`http://file.vt9999.cn/productimg/FlowWorkFiles/${proId}/${v}`)
    }
}

export default HM;
