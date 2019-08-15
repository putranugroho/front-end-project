import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { onLoginUser } from '../action/index'



class Login extends Component {


    onButtonClick = () => {
        const username = this.username.value
        const password = this.password.value

        this.props.onLoginUser(username,password)
    }
        
    render () {
        if (this.props.user.username === '') {
            return (
                <div> 
                    <div className='mt-3 row'> 
                        <div className='col-sm-5 mx-auto card'>
                            <div className='card-body'>
                                <div className='border-bottom border-secondary card-title'>
                                    <h1>Login</h1>
                                </div>
                                <div className='card-title'>
                                    <h4>Username</h4>
                                </div>
                                <form className='input-group'>
                                    <input className='form-control' type='text' ref={(input)=>{this.username = input}}/>
                                </form>
                                <div className='card-title'>
                                    <h4>Password</h4>
                                </div>
                                <form className='input-group'>
                                    <input className='form-control' type='password' ref={(input)=>{this.password = input}}/>
                                </form>
                                <button className='btn btn-primary' onClick={this.onButtonClick}>
                                    LOGIN
                                </button>
                                <p>Tidak memiliki akun ? <Link to='/register'>Click Disini!</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return <Redirect to='/'/>
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps, {onLoginUser})(Login)