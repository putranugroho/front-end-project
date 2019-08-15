import React, { Component } from 'react'

class Home extends Component {

    render(){
        return(
            <div >
                <div class="card bg-dark text-white">
                    <img src="https://images.unsplash.com/photo-1440539724152-082543aaa376?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80" class="card-img " alt=""/>
                    <div class="card-img-overlay">
                        <h1 class="card-title">Card title</h1>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text">Last updated 3 mins ago</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home