import React, { Component } from 'react'
// import axios from 'axios'
import { Jumbotron } from 'reactstrap'
import { connect } from 'react-redux'

class Profile extends Component {
    
    render() {
        if(this.props.user){
        const {username,avatar,f_name} = this.props.user
        console.log(f_name);
        
            return (
                <Jumbotron >
                    <div className="container mt-5">
                        <img src={`http://localhost:2019/users/avatar/${avatar}`}  alt="Please choose your avatar" key={new Date()} />
                        <h1 className="display-3">Hello, {username}</h1>
                        <p className="lead">Lay childe peace passed parasites and he. Spent it nor sad cell this ungodly and cared sister, stalked adversity be noontide scape dwell. Youth few mote passion mood bade vexed was all, change the when then one haply him passed, his mirth these bacchanals sea though. Aye the and his.</p>
                        <button className="btn btn-primary">Learn more >></button>
                    </div>
                </Jumbotron>
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