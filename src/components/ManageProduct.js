import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ManageProduct extends Component {
    
   state = {
        products: [],
        category : [],
        selectedID: 0,
        input : false
    }

    componentDidMount(){
        this.getProduct()
        this.getCategory()
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
            .then(res => {
               this.setState({products: res.data, selectedID : 0, input : 0})
            })
    }

    getCategory = () => {
        axios.get('http://localhost:2019/category')
            .then(res => {
               this.setState({category: res.data, selectedID : 0})
            })
    }

    addProduct = () => {
        const product_name = this.product_name.value
        const category = this.category.value
        const detail = this.desc.value
        const price = this.price.value
        const stock = this.stock.value
        
        axios.get('http://localhost:2019/categoryname?category_name='+category)
        .then(res=>{
            const category_id = res.data.id

            axios.post('http://localhost:2019/addproducts/',
            {
                product_name,
                category_id,
                detail,
                price,
                stock
            }).then(res=>{
                console.log("data telah disimpan");
                console.log(res);
                this.getProduct()
            })
        })
    }

    deleteProduct = (item) => {
        
        axios.delete('http://localhost:2019/products/'+item.id).then(res=>{
            console.log("data telah dihapus");
            console.log(res);
            this.getProduct() 
        })
    }

    saveProduct = (item) => {
        const product_name = this.editProduct_name.value
        const category = this.editCategory.value
        const detail = this.editDesc.value
        const price = this.editPrice.value
        const stock = this.editStock.value
        
        axios.get('http://localhost:2019/categoryname?category_name='+category)
        .then(res=>{
            const category_id = res.data.id

            axios.patch('http://localhost:2019/products/'+item,
            {
                product_name,
                category_id,
                detail,
                price,
                stock
            }).then(res=>{
                console.log("data telah disimpan");
                console.log(res);
                console.log(item);
                this.getProduct()
            })
        })
    }

    renderCategory = () => {
        return this.state.category.map( catMap => {
            return (<option>{catMap.category_name}</option>)
        })
    }

    renderInputList = () => {
        if(this.state.input === true){
            return (
                <tr>
                    <th scope="col"><h5></h5></th>
                    <th scope="col"><input ref={input => this.product_name = input} className="form-control" type="text" /></th>
                    <th scope="col">
                        <select class="form-control" ref={input => {this.category = input}}>
                                {this.renderCategory()}
                        </select>
                    </th>
                    <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                    <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                    <th scope="col"><input ref={input => this.stock = input} className="form-control" type="text" /></th>
                    <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                    <th scope="col">
                        <button className="btn btn-warning" onClick={this.addProduct}>Add</button>
                        <button className="btn btn-danger" onClick={()=>this.setState({input : false})}>Cancel</button>
                    </th>
                </tr>
            )
        }
    }

    renderList = () => {
        return this.state.products.map( item => { // {id, name, price, desc, src}
            if(item.id !== this.state.selectedID){
                return this.state.category.map( catMap => {
                    if(item.category_id == catMap.id){
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.product_name}</td>
                                <td>{catMap.category_name}</td>
                                <td>{item.detail}</td>
                                <td>{item.price}</td>
                                <td>{item.stock}</td>
                                <td>
                                    <img className='list' src={item.src}/>
                                </td>
                                <td>            
                                    <Button color="danger" onClick={()=>{this.setState({selectedID : item.id})}}>Edit</Button>
                                    <button className = 'btn btn-warning m-1' onClick={()=>{this.deleteProduct(item)}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                }
                )
            } else {
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>
                            <input className="form-control" ref={input => {this.editProduct_name = input}} type="text" defaultValue={item.product_name}/>
                        </td>
                        <td>
                            {/* <input className="form-control" ref={input => {this.editCategory = input}} type="text" /> */}
                            <select class="form-control" ref={input => {this.editCategory = input}} defaultValue={item.category_id}>
                                {this.renderCategory()}
                            </select>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editDesc = input}} type="text" defaultValue={item.detail}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editPrice = input}} type="text" defaultValue={item.price}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editStock = input}} type="text" defaultValue={item.stock}/>
                        </td>
                        <td>
                            <img className='list' src={item.src}/>
                        </td>
                        <td>            
                            <button className = 'btn btn-danger m-1' onClick={()=>{this.saveProduct(item.id)}}>Save</button>
                            <button className = 'btn btn-warning m-1' onClick={()=>{this.setState({selectedID : 0})}}>Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
        
    }

    render () {
    if(this.props.user.username === ''){
        return <h1> L o a d i n g . . . </h1>
    }
    return (
        <div className="container">
            <h1 className="display-4 text-center">List Product</h1>
            <table className="table table-hover mb-5">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">PRODUCT NAME</th>
                        <th scope="col">CATEGORY</th>
                        <th scope="col">DESC</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">STOCK</th>
                        <th scope="col">PICTURE</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderList()}
                    {this.renderInputList()}
                    <th scope="col"><button className="btn btn-outline-warning" onClick={()=>this.setState({input : true})}>Add</button></th>
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


export default connect(mapStatetoProps)(ManageProduct)
