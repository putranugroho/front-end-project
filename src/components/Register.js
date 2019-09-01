import React, {Component} from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'

class Register extends Component {

    state = {
        redirect: false
    }
    
    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }
    
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/login' />
        }
    }

    onButtonClick = () => {
        const username = this.username.value
        const f_name = this.fname.value
        const l_name = this.lname.value
        const email = this.email.value
        const password = this.password.value

        if (username === '') {
            return alert("Username harus diisi")
        } else if (f_name === '' || l_name === '') {
            return alert("Nama harus diisi")
        }else if (email === '') {
            return alert("Email harus diisi")
        }else if (password === '') {
            return alert("Password harus diisi")
        }else{
            axios.post(
                'http://localhost:2019/users/input',
                {
                    username, f_name, l_name, email, password
                }
            ).then( (res) => {
                alert('Data berhasil di input')
                console.log(res)
                this.setRedirect()
            }).catch( (err) => {
                alert('Gagal post data')
                console.log(err)
            })
        }
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
                            <button className='btn btn-primary mt-2' onClick={this.onButtonClick}>
                                Click for Register
                            </button>
                            <p>Sudah memiliki akun ? <Link to='/login'>Login Disini!</Link></p>
                            {this.renderRedirect()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register