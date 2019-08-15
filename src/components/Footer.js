import React, { Component } from 'react'
import Sidebar from "react-sidebar";
// import {Link} from 'react-router-dom'
// import axios from 'axios'
// import {connect} from 'react-redux'

class ProductItem extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }


  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

    render () {
        return (
            <div className="fixed-bottom bg-white">
                <div class="container">
                <div class="row justify-content-center">
                    <div class="col col-2">
                    <button type="button" class="btn btn-primary">
                        CART <span class="badge badge-light">0</span>
                        </button>   
                    </div>
                    <div class="col-md-6"></div>
                    <div class="col col-2">
                    <Sidebar
                        sidebar={<h1>sidebar content</h1>}
                        open={this.state.sidebarOpen}
                        onSetOpen={this.onSetSidebarOpen}
                        styles={{ sidebar: { background: "white" } }}
                    >
                        <button onClick={() => this.onSetSidebarOpen(true)}>
                        Open sidebar
                        </button>
                    </Sidebar>
                    {/* <button type="button" class="btn btn-primary" onClick={() => this.onSetSidebarOpen(true)} >
                        BAYAR
                    </button>    */}
                    </div>
                </div>
                </div>

                
            </div>
        )
    }
}

export default ProductItem