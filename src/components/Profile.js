import React, { Component } from 'react'
import axios from 'axios'
import { Jumbotron } from 'reactstrap'
import { connect } from 'react-redux'

class Profile extends Component {
    
    render() {
        if(this.props.user){
        const {id,username,avatar,f_name} = this.props.user
        console.log(f_name);
        
            return (
                <div className="container mt-5">
                    <Jumbotron >
                        <img src={`http://localhost:2019/users/avatar/${avatar}`}  alt="Please choose your avatar" key={new Date()} />
                        <h1 className="display-3">Hello, {username}</h1>
                        <p className="lead"></p>
                    </Jumbotron>
                </div>
            )
        }

        return <h1>Loading</h1>
    }
}

const mapStatetoProps = state => {
    return {
        user: state.auth
    }
}


export default connect(mapStatetoProps)(Profile)