import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import './index.css'

class NavSide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          xmglNav: false,
          sewageNav: false,
          neilaoNav: false,
          userNav: false,
          serverNav: false
        }
    }
    toggleNav(e,nav){
      this.setState({
        [nav]:!this.state[nav]
      })

    }
    render() {
        return (<div className="navbar-default navbar-side">
            <div className="sidebar-collapse">
                <ul className="nav">
                {/*
                  <li>
                      <NavLink exact to="/welcome" activeClassName="active-menu">
                          <i className="fa fa-university"></i>
                          <span>海绵城市欢迎</span>
                      </NavLink>
                  </li>
                */}

                    <li>
                        <Link to="/project" onClick={(e)=>{this.toggleNav(e,'xmglNav')}}>
                            <i className="fa fa-sitemap"></i>
                            <span>项目管控</span>
                            <span className={`fa ${this.state.xmglNav?'fa-angle-down':'fa-angle-left'}`}></span>
                        </Link>
                        <ul className={`nav nav-second-level collapse ${this.state.xmglNav?'in':''}`}>
                            <li>
                                <NavLink to="/project" activeClassName="active-menu">项目总览</NavLink>
                            </li>
                            <li>
                                <NavLink to="/project-planing" activeClassName="active-menu">规划管理</NavLink>
                            </li>
                            <li>
                                <NavLink to="/project-design" activeClassName="active-menu">设计管控</NavLink>
                            </li>
                            <li>
                                <NavLink to="/project-process" activeClassName="active-menu">施工管理</NavLink>
                            </li>
                            <li>
                                <NavLink to="/project-acceptance" activeClassName="active-menu">竣工验收</NavLink>
                            </li>
                            <li>
                                <NavLink to="/project-control" activeClassName="active-menu">指标调控</NavLink>
                            </li>
                            <li>
                                <NavLink to="/user-center" activeClassName="active-menu">用户中心</NavLink>
                            </li>
                        </ul>
                    </li>



                </ul>

            </div>

        </div>)
    }
}

export default NavSide


// <li>
//   <Link to="/command-info" onClick={(e)=>{this.toggleNav(e,'neilaoNav')}}>
//       <i className="fa fa-th-list"></i>
//       <span>内涝应用指挥</span>
//       <span className={`fa ${this.state.neilaoNav?'fa-angle-down':'fa-angle-left'}`}></span>
//   </Link>
//       <ul className={`nav nav-second-level collapse ${this.state.neilaoNav?'in':''}`}>
//         <li>
//             <NavLink to="/command-info" activeClassName="active-menu">指挥总览</NavLink>
//         </li>
//         <li>
//             <NavLink to="/command-alarm" activeClassName="active-menu">内涝报警</NavLink>
//         </li>
//         { /*
//           <li>
//             <NavLink to="/command-warning" activeClassName="active-menu">内涝预警</NavLink>
//           </li>
//           */
//         }
//         <li>
//             <NavLink to="/command-contingency" activeClassName="active-menu">应急指挥</NavLink>
//         </li>
//     </ul>
// </li>





// <li>
//   <Link to="/sewage-organization" onClick={(e)=>{this.toggleNav(e,'sewageNav')}}>
//       <i className="fa fa-database"></i>
//       <span>城市黑臭水体管理</span>
//       <span className={`fa ${this.state.sewageNav?'fa-angle-down':'fa-angle-left'}`}></span>
//   </Link>
//     <ul className={`nav nav-second-level collapse ${this.state.sewageNav?'in':''}`}>
//         <li>
//             <NavLink to="/sewage-organization" activeClassName="active-menu">河长单位管理</NavLink>
//         </li>
//         <li>
//             <NavLink to="/sewage-project" activeClassName="active-menu">整治项目管理</NavLink>
//         </li>
//         <li>
//             <NavLink to="/sewage-evaluate" activeClassName="active-menu">水质监控评估管理</NavLink>
//         </li>
//         <li className="active">
//             <a href="javascript:;" onClick={(e)=>{this.toggleNav(e,'serverNav')}}>
//               <span>公众服务</span>
//               <span className={`fa ${this.state.serverNav?'fa-angle-down':'fa-angle-left'}`}></span>
//             </a>
//             <ul className={`nav nav-third-level collapse ${this.state.serverNav?'in':''}`}>
//                 <li>
//                     <NavLink to="/server-info" activeClassName="active-menu">公众信息管理</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/server-alert" activeClassName="active-menu">公众报警信息管理</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/server-alert-form" activeClassName="active-menu">公众报警信息填报(微信端)</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/server-suggest-public" activeClassName="active-menu">公众建议发布(微信端)</NavLink>
//                 </li>
//
//             </ul>
//
//         </li>
//     </ul>
// </li>
// <li>
//   <a href="#" onClick={(e)=>{this.toggleNav(e,'userNav')}}>
//       <i className="fa fa-bar-chart"></i>
//       <span>统计报表</span>
//       <span className={`fa ${this.state.userNav?'fa-angle-down':'fa-angle-left'}`}></span>
//   </a>
//     <ul className={`nav nav-second-level collapse ${this.state.userNav?'in':''}`}>
//         <li>
//             <NavLink to="/chart" activeClassName="active-menu">用户统计</NavLink>
//         </li>
//
//     </ul>
// </li>
