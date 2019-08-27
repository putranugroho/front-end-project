import React, { Component } from 'react'
import axios from 'axios'
import { Jumbotron } from 'reactstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import cookie from 'universal-cookie'

import {updateProfile} from '../action'

class Profile extends Component {
    state = {
        edit : false,
        upload : false
    }

    uploadImage = (id) => {
        const formData = new FormData()
        const avatar = this.image.files[0]
        
        formData.append('avatar', avatar)
        formData.append('id', id)

        axios.post('http://localhost:2019/users/avatar', formData
        ).then(res=>{
            console.log('upload berhasil');
            this.props.updateProfile(id)
            this.setState({upload:false})
        })
    }

    renderImage = () => {
        const {id,avatar} = this.props.user

        if(!avatar){
            return(
                <div className="col-sm-4 m-2">
                    <h1>upload dulu brur</h1>
                    <p className='text-center mt-3'>
                        <input type='file' ref={input => {this.image = input}}/>
                        <button className="btn btn-success m-2" onClick={()=>this.uploadImage(id)}>Save</button>
                        <button className="btn btn-danger m-2" onClick={()=>this.setState({upload:false})}>Cancel</button>
                    </p>
                </div>
            )
        } else {
            if(!this.state.upload){
                return (
                    <div className="col-sm-4 m-2">
                        <img src={`http://localhost:2019/users/avatar/${avatar}`}  alt="Please choose your avatar" key={new Date()} style= {{width: "320px"}} />
                        <p className='text-center mt-3'>
                            <button className="btn btn-primary" onClick={()=>this.setState({upload:true})}>Upload</button>
                        </p>
                    </div>
                )    
            } else {
                return (
                    <div className="col-sm-4 m-2">
                        <img src={`http://localhost:2019/users/avatar/${avatar}`}  alt="Please choose your avatar" key={new Date()} style= {{width: "320px"}} />
                        <p className='text-center mt-3'>
                            <input type='file' ref={input => {this.image = input}}/>
                            <button className="btn btn-success m-2" onClick={()=>this.uploadImage(id)}>Save</button>
                            <button className="btn btn-danger m-2" onClick={()=>this.setState({upload:false})}>Cancel</button>
                        </p>
                    </div>
                )
            }
        }
    }

    renderInput = () => {
        const {username, id, email, f_name, l_name, age, gender} = this.props.user
        if (this.state.edit) {
        return (
            <div className="col-sm-6 m-2">
                <form>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="firstName">First name</label>
                        <input type="text" class="form-control" id="firstName" placeholder="" value="" required=""/>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input type="text" class="form-control" id="lastName" placeholder="" value="" required=""/>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="username">Username</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                        <span class="input-group-text">@</span>
                        </div>
                        <input type="text" class="form-control" id="username" placeholder="Username" required=""/>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="you@example.com"/>
                </div>

                <div class="mb-3">
                    <label for="address">Age</label>
                    <input type="text" class="form-control" id="address" placeholder="69 Years Old" required=""/>
                </div>

                <div class="mb-3">
                    <label for="address">Gender</label>
                    <input type="text" class="form-control" id="address" placeholder="Male / Female" required=""/>
                </div>

                </form>
                <p className='text-center'>
                <button className="btn btn-primary m-3" onClick={() => this.saveProfile()} >Save</button>
                <button className="btn btn-primary m-3" onClick={() => this.setState({edit:!this.state.edit})} >Cancel</button>
                </p>
            </div>
        )
        } else {
            return(
            <div className="col-sm-6 m-2">
            <h1 className="display-3">Hello, {username} </h1>
            <div className='row'>
                <h6>
                <label className='col-4'>FULLNAME</label>
                <label className='col-2 text-left'>:</label>
                <label className='col-3'>{f_name}</label>
                <label className='col-3'>{l_name}</label>
                </h6>
            </div>
            <div className='row'>
                <label className='col-4'>Email : </label>
                <label className='col-4'>{email}</label>
            </div>
            <div className='row'>
                <label className='col-4'>Age : </label>
                <label className='col-4'>{age}</label>
            </div>
            <div className='row'>
                <label className='col-4'>Gender : </label>
                <label className='col-4'>{gender}</label>
            </div>
            <button className="btn btn-primary my-3" onClick={() => this.setState({edit:!this.state.edit})} >EDIT</button>
            </div>
            )

        }
    }

    render() {
        if(this.props.user.username !== ''){
            return (
                <Jumbotron>
                    <div className="container">
                        <div className="row">
                            {this.renderImage()}
                            <div className='col-1'></div>
                            {this.renderInput()}
                        </div>
                    </div>
                </Jumbotron>
            )
        }
        return <Redirect to='/'/>
    }
}

const mapStatetoProps = state => {
    return {
        user: state.auth
    }
}


export default connect(mapStatetoProps,{updateProfile})(Profile)