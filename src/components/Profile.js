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
        const {username, id, email, f_name, l_name} = this.props.user

        return (
            <div className="col-sm-6 m-2">
                <h1 className="display-3">Hello, {username} </h1>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">ID</span>
                    </div>
                    <input type="text" class="form-control" defaultValue={id} aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">First Name</span>
                    </div>
                    <input type="text" class="form-control" defaultValue={f_name} aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Last Name</span>
                    </div>
                    <input type="text" class="form-control" defaultValue={l_name} aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Email</span>
                    </div>
                    <input type="text" class="form-control" defaultValue={email} aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <p className='text-center'>
                <button className="btn btn-primary my-3" onClick={() => {this.setState({edit:!this.state.edit})}}>Edit Profile >></button>
                </p>
            </div>
        )
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