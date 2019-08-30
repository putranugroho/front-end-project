import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'


class ManageDetail extends Component {
    
    state = {
        products: [],
        edit : 0,
        input : 0
    }

    componentDidMount(){
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
            .then(res => {
               this.setState({products: res.data, edit : 0, input : 0})
            })
    }

    deleteDetail = (item) => {
        const detail = null

        axios.patch('http://localhost:2019/products/'+item,
            {
                detail
            }).then(res=>{
                console.log("data telah disimpan");
                console.log(res);
                this.getProduct()
            })
    }

    saveProduct = (item) => {
        const detail = this.editDetail.value
        
        if (detail === '') {
            alert('masukan detail')
        } 
        else {
            axios.patch('http://localhost:2019/products/'+item,
            {
                detail
            }).then(res=>{
                console.log("data telah disimpan");
                console.log(res);
                this.getProduct()
            })
        }
    }

    renderList = () => {
        return this.state.products.map (item => {
            if (item.id !== this.state.edit){
                return (
                    <tr>
                        <th>{item.id}</th>
                        <th>{item.product_name}</th>
                        <th>{item.detail}</th>
                        <th>
                            <button className='btn btn-warning' onClick={()=>{this.setState({edit:item.id})}}>Edit</button>
                            <button className='btn btn-danger' onClick={()=>{this.deleteDetail(item.id)}}>Delete</button>
                        </th>
                    </tr>
                )
            }
                return (
                    <tr>
                        <th>{item.id}</th>
                        <th>{item.product_name}</th>
                        <th><input ref={input => {this.editDetail = input}} defaultValue={item.detail}></input></th>
                        <th>
                            <button className='btn btn-success' onClick={()=>{this.saveProduct(item.id)}}>Save</button>
                            <button className='btn btn-danger' onClick={()=>this.setState({edit:0})}>Cancel</button>
                        </th>
                    </tr>
                )
        })
    }

    render () {
        return (
            <div className="container">
                <h1 className="display-4 text-center">Manage Detail</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">PRODUCT NAME</th>
                            <th scope="col">DETAIL</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
            </div>
        )
    }

}

const mapStatetoProps = state => {
    return {
        user: state.auth
    }
}


export default connect(mapStatetoProps)(ManageDetail)
