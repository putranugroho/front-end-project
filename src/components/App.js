import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'

import Register from './Register'
import Home from './Home'
import Header from './Header'
import Slider from './Slider'
import ProductSlider from './ProductSlider'
import ManageProduct from './ManageProduct'
import Login from './Login'
import Profile from './Profile'
// import detailProduct from './detailProduct'
// import checkOut from './checkout'
import Footer from './Footer'

import { keepLogin } from '../action'

const cookie = new cookies()

class App extends React.Component{
    
    componentDidMount(){
        // Check cookie
        const objCookie = cookie.get("userName")

        if (objCookie !== undefined) {
            // Login ulang
            this.props.keepLogin(objCookie)
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
                    <Route path='/' exact component={ProductSlider}/>
                    <Route path='/manageproduct' component={ManageProduct}/>
                    <Route path='/profile' component={Profile}/>
                    {/* <Route path='/detailproduct/:product_id' component={detailProduct}/> */}
                    {/* <Route path='/checkout' component={checkOut}/> */}
                    {/* <Footer/> */}
                </div>
            </BrowserRouter>
        )   
    }
}

export default connect(null, {keepLogin})(App)
// export default App