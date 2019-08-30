import React, { Component } from 'react'
import axios from 'axios'
import { Jumbotron } from 'reactstrap'
import { connect } from 'react-redux'

import {updateProfile} from '../action'

class Profile extends Component {
    state = {
        edit : false,
        upload : false
    }

    saveProfile = (id) => {
        const f_name = this.f_name.value
        const l_name = this.l_name.value
        const email = this.email.value
        const age = this.age.value
        const gender = this.gender.value

        if (f_name === '') {
            alert('masukan first name')
        }
        else if (l_name === ''){
            alert('masukan last name')
        }
        else if (age === ''){
            alert('masukan age')
        }
        else if (email === ''){
            alert('masukan email')
        }else{
        
        axios.patch('http://localhost:2019/users/profile/'+id,
        {
            f_name,
            l_name,
            email,
            age,
            gender
        }).then(res=>{
            console.log("data telah disimpan");
            console.log(res);
            this.props.updateProfile(id)
            this.setState({edit:false})
        })
        }
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
                        <input type="text" class="form-control" ref={input => {this.f_name = input} } defaultValue={f_name}/>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input type="text" class="form-control" ref={input => {this.l_name = input} } defaultValue={l_name}/>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" ref={input => {this.email = input} } defaultValue={email}/>
                </div>

                <div class="mb-3">
                    <label for="address">Age</label>
                    <input type="number" class="form-control" ref={input => {this.age = input} } defaultValue={age}/>
                </div>

                <div class="mb-3">
                    <label for="address">Gender</label>
                    <select class="form-control" ref={input => {this.gender = input} }  defaultValue={gender}>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                        <option>She-Male</option>
                    </select>
                </div>

                </form>
                <p className='text-center'>
                <button className="btn btn-primary m-3" onClick={() => this.saveProfile(id)} >Save</button>
                <button className="btn btn-primary m-3" onClick={() => this.setState({edit:!this.state.edit})} >Cancel</button>
                </p>
            </div>
        )
        } else {
            return(
            <div className="col-sm-6 m-2">
            <form>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="firstName">First name</label>
                        <input type="text" class="form-control" defaultValue={f_name} disabled/>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input type="text" class="form-control" defaultValue={l_name} disabled/>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" defaultValue={email} disabled/>
                </div>

                <div class="mb-3">
                    <label for="address">Age</label>
                    <input type="number" class="form-control" defaultValue={age} disabled/>
                </div>

                <div class="mb-3">
                    <label for="address">Gender</label>
                    <select class="form-control" ref={input => {this.gender = input} }  defaultValue={gender} disabled>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                        <option>She-Male</option>
                    </select>
                </div>
            </form>
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
                        <h1 className="display-3 text-center">Hello, @ {this.props.user.username} </h1>
                        <br></br>
                        <div className="row">
                            {this.renderImage()}
                            <div className='col-1'></div>
                            {this.renderInput()}
                        </div>
                    </div>
                </Jumbotron>
            )
        }
        return <h1>L o a d i n g . . .</h1>
    }
}

const mapStatetoProps = state => {
    return {
        user: state.auth
    }
}


export default connect(mapStatetoProps,{updateProfile})(Profile)