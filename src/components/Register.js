import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Register extends Component {

    onButtonClick = () => {
        const username = this.username.value
        const f_name = this.fname.value
        const l_name = this.lname.value
        const email = this.email.value
        const password = this.password.value

        axios.post(
            'http://localhost:2019/users/input',
            {
                username, f_name, l_name, email, password
            }
        ).then( (res) => {
            console.log('Data berhasil di input')
            console.log(res)
        }).catch( (err) => {
            console.log('Gagal post data')
            console.log(err)
        })
    }

    render (){
        return (
            <div> 
                <div className='mt-3 row'> 
                    <div className='col-sm-5 mx-auto card'>
                        <div className='card-body'>
                            <div className='border-bottom border-secondary card-title'>
                                <h1>Register</h1>
                            </div>
                            <div className='card-title'>
                                <h4>Username</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control' type='text' ref={(input)=>{this.username = input}}/>
                            </form>
                            <div className='card-title'>
                                <h4>Full Name</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control' type='text' ref={(input)=>{this.fname = input}}/>
                                <input className='form-control' type='text' ref={(input)=>{this.lname = input}}/>
                            </form>
                            <div className='card-title'>
                                <h4>Email</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control' ref={(input)=>{this.email = input}}/>
                            </form>
                            <div className='card-title'>
                                <h4>Password</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control' type='password' ref={(input)=>{this.password = input}}/>
                            </form>
                            <button className='btn btn-primary' onClick={this.onButtonClick}>
                                Click for Register
                            </button>
                            <p>Sudah memiliki akun ? <Link to='/login'>Login Disini!</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register