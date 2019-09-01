import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import ManageProduct from './ManageProduct'
import ManageCategory from './ManageCategory'
import ManageDetail from './ManageDetail'
import ManageOrder from './ManageOrder'

class HomeAdmin extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1',
          checkout: [],
          menu: 1,
          selectedId: 0
        };
      }

    componentDidMount(){
        axios.get('http://localhost:2019/paidpayment/')
        .then(res => {
            this.setState({checkout: res.data})
        })
    }

      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    renderlistInput= () => {
        if (this.state.menu === 1) {
            if (this.state.checkout.length > 0) {
                alert('Order baru telah dibayar, Silahkan periksa Manage Order')
            }
        } else if (this.state.menu === 2){
            return (
                <div className="col-md-10 container-fluid">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                            >
                            Manage Product
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                            >
                            Manage Category
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                            >
                            Manage Detail
                            </NavLink>
                        </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                            <Col sm="12">
                                <ManageProduct/>
                            </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                            <Col sm="12">
                                <ManageCategory/>
                            </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                            <Col sm="12">
                                <ManageDetail/>
                            </Col>
                            </Row>
                        </TabPane>
                        </TabContent>
                </div>
            )   
        }  else if (this.state.menu === 3){
            return (
                <div className="col-md-10 container-fluid">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                            >
                            Order Pending
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                            >
                            Order Dibayar
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                            >
                            Order Selesai
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '4' })}
                            onClick={() => { this.toggle('4'); }}
                            >
                            Order Cancel
                            </NavLink>
                        </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                            <Col sm="12">
                                <ManageOrder  status={'Transaksi Pending'}/>
                            </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                            <Col sm="12">
                            <ManageOrder  status={'Transaksi Dibayar'}/>
                            </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                            <Col sm="12">
                            <ManageOrder  status={'Transaksi Selesai'}/>
                            </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="4">
                            <Row>
                            <Col sm="12">
                            <ManageOrder  status={'Transaksi Ditolak'}/>
                            </Col>
                            </Row>
                        </TabPane>
                        </TabContent>
                </div>
            )
        }
    }

    render() {
        if (this.props.admin.username !== '') {
        if (this.state.checkout.length > 0) {
            return (
            <div>
                <div class="container-fluid">
                    <div class="row">
                        <nav class="col-md-2 mt-5 col-xs-1 d-none d-md-block bg-light sidebar">
                            <div className="sidebar-sticky" style={{}}>
                                <ul class="nav flex-column">
                                <li class="nav-item list-group-text-light" onClick={()=>{this.setState({menu:1})}}>
                                    <p className="btn btn-block btn-outline-danger" href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    Dashboard <span class="sr-only">(current)</span>
                                    </p>
                                </li>
                                <li class="nav-item" onClick={()=>{this.setState({menu:2})}}>
                                    <p className="btn btn-block btn-outline-danger" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                    Products
                                    </p>
                                </li>
                                <li class="nav-item" onClick={()=>{this.setState({menu:3})}}>
                                    <p className="btn btn-block btn-outline-danger" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                    Orders
                                    <span class="badge badge-danger m-1">{this.state.checkout.length}</span>
                                    </p>
                                </li>
                                <li class="nav-item">
                                    <p className="btn btn-block btn-outline-danger" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    Customers
                                    </p>
                                </li>
                                <li class="nav-item">
                                    <p className="btn btn-block btn-outline-danger" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                    Reports
                                    </p>
                                </li>
                                <li class="nav-item">
                                    <p className="btn btn-block btn-outline-danger" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                    Integrations
                                    </p>
                                </li>
                                </ul>
                                
                            </div>
                        </nav>
                        {this.renderlistInput()}
                    </div>
                </div>
            </div>
            )
        }
        return (
            <div>
                <div class="container-fluid">
                    <div class="row">
                        <nav class="col-md-2 mt-5 col-xs-1 d-none d-md-block bg-light sidebar">
                            <div className="sidebar-sticky" style={{}}>
                                <ul class="nav flex-column">
                                <li class="nav-item list-group-text-light" onClick={()=>{this.setState({menu:1})}}>
                                    <p className="btn btn-block btn-outline-danger" href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    Dashboard <span class="sr-only">(current)</span>
                                    </p>
                                </li>
                                <li class="nav-item" onClick={()=>{this.setState({menu:2})}}>
                                    <p className="btn btn-block btn-outline-danger" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                    Products
                                    </p>
                                </li>
                                <li class="nav-item" onClick={()=>{this.setState({menu:3})}}>
                                    <p className="btn btn-block btn-outline-danger" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                    Orders
                                    </p>
                                </li>
                                <li class="nav-item">
                                    <p className="btn btn-block btn-outline-danger" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    Customers
                                    </p>
                                </li>
                                <li class="nav-item">
                                    <p className="btn btn-block btn-outline-danger" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                    Reports
                                    </p>
                                </li>
                                <li class="nav-item">
                                    <p className="btn btn-block btn-outline-danger" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                    Integrations
                                    </p>
                                </li>
                                </ul>                    
                            </div>
                        </nav>
                        {this.renderlistInput()}
                    </div>
                </div>
            </div>
        )
        }
        return <Redirect to='/loginadmin'/>
    }
}

const mapStatetoProps = state => {
    return {
        admin: state.admin
    }
}

export default connect(mapStatetoProps)(HomeAdmin)