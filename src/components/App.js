import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'

import Register from './Register'
import Home from './Home'
import Header from './Header'
import Slider from './Slider'
import Product from './Product'
import HomeAdmin from './admin/HomeAdmin'
import LoginAdmin from './admin/LoginAdmin'
import ManageOrder from './admin/ManageOrder'
import Login from './Login'
import Profile from './Profile'
import Blog from './Blog'
import Event from './Event'
import Confirm from './Confirm'
import detailProduct from './DetailProduct'
import OrderHistory from './OrderHistory'
import checkout from './Checkout'
import Footer from './Footer'

import { keepLogin, keepAdmin } from '../action'

const cookie = new cookies()

class App extends React.Component{
    
    componentDidMount(){
        // Check cookie
        const objCookie = cookie.get("userName")
        const objAdmin = cookie.get('Admin')

        if (objCookie !== undefined) {
            this.props.keepLogin(objCookie)
        }
        
        if (objAdmin !== undefined) {
            this.props.keepAdmin(objAdmin)
        }

    }

    render() {
         return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path='/register' component={Register}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/' exact component={Slider}/>
                    <Route path='/' exact component={Home}/>
                    <Route path='/product' exact component={Product}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/blog' component={Blog}/>
                    <Route path='/event' component={Event}/>
                    <Route path='/detailproduct/:product_id' component={detailProduct}/>
                    <Route path='/OrderHistory/:users_id' component={OrderHistory}/>
                    <Route path='/admin' component={HomeAdmin}/>
                    <Route path='/loginadmin' component={LoginAdmin}/>
                    <Route path='/ManageOrder' component={ManageOrder}/>
                    <Route path='/checkout/:users_id' component={checkout}/>
                    <Route path='/confirm/:users_id' component={Confirm}/>
                    <Footer/>
                </div>
            </BrowserRouter>
        )   
    }
}

export default connect(null, {keepLogin,keepAdmin})(App)