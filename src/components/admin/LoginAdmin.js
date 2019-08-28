import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { onLoginAdmin } from '../../action'



class LoginAdmin extends Component {


    onButtonClick = () => {
        const username = this.username.value
        const password = this.password.value

        this.props.onLoginAdmin(username,password)
    }
        
    render () {
        if (this.props.admin.username === '') {
            return (
                <div> 
                    <div className='mt-3 row'> 
                        <div className='col-sm-5 mx-auto card'>
                            <div className='card-body'>
                                <div className='border-bottom border-secondary card-title'>
                                    <h1>Login Admin</h1>
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
        admin : state.admin // {id, username}
    }
}

export default connect(mapStateToProps, {onLoginAdmin})(LoginAdmin)