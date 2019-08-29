import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'


class ManageProduct extends Component {
    state = {
        products: [],
        search_pro: [],
        category : [],
        search_cat : [],
        edit: 0,
        upload : 0,
        input : false,
        modal: false,
        filter: false
    };

    componentDidMount(){
        this.getProduct()
        this.getCategory()
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
            .then(res => {
               this.setState({products: res.data, search_pro : res.data, edit : 0, input : 0, upload : 0})
            })
    }

    getCategory = () => {
        axios.get('http://localhost:2019/category')
            .then(res => {
               this.setState({category: res.data, search_cat : res.data, edit : 0})
            })
    }

    addProduct = () => {
        const product_name = this.product_name.value
        const category_id = this.category.value
        const price = this.price.value
        const stock = this.stock.value
        console.log(this.category.value);
        
        
        axios.post('http://localhost:2019/addproducts',
        {
            product_name,
            category_id,
            price,
            stock
        }).then(res=>{
            console.log("data telah disimpan");
            console.log(res);
            this.getProduct()
        })
    }

    saveProduct = (item) => {
        const product_name = this.editProduct_name.value
        const category_id = this.editCategory.value
        const price = this.editPrice.value
        const stock = this.editStock.value
        
        axios.patch('http://localhost:2019/products/'+item,
        {
            product_name,
            category_id,
            price,
            stock
        }).then(res=>{
            console.log("data telah disimpan");
            console.log(res);
            this.getProduct()
        })
    }

    uploadImage = (id) => {
        const formData = new FormData()
        const image = this.image.files[0]
        
        formData.append('image', image)
        formData.append('id', id)

        axios.post('http://localhost:2019/products/image/', formData
        ).then(res=>{
            this.getProduct()
        })
    }

    resetFilter = () => {
        return(
            this.setState({products:this.state.search_pro, category:this.state.search_cat, filter:false})
        )
    }

    onBtnSearch = () => {
        const name = this.nama.value
        const category = this.category.value
        const max = parseInt(this.max.value) 
        const min = parseInt(this.min.value)
        
        var proSearch = this.state.search_pro.filter (item => {
            if(isNaN(min) && isNaN(max)){ // Search by Name
                return (
                    item.product_name.toLowerCase().includes(name.toLowerCase())
                )
            } else if (isNaN(min)){ // Name and Max
                return (
                    item.product_name.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price <= max
                )
            } else if (isNaN(max)){ // Name and Max
                return (
                    item.product_name.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price >= min
                )
            } else if (item.price <= max && item.price >= min){
                return (
                    item.product_name.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price <= max && item.price >= min
                )
            }
        })

        

        var catSearch = this.state.search_cat.filter (item => {
            if(category){
                return(
                    item.category_name.toLowerCase().includes(category.toLowerCase())
                )
            }
        })

        if (catSearch[0]) {
            this.setState({category: catSearch, filter: true})
        }
        if (proSearch[0]) {
            this.setState({products: proSearch, filter: true})
        }

        
    }

    deleteProduct = (item) => {
        axios.delete('http://localhost:2019/products/'+item.id).then(res=>{
            console.log("data telah dihapus");
            console.log(res);
            this.getProduct() 
        })
    }

    renderCategory = () => {
        return this.state.category.map( catMap => {
            return (<option value={catMap.id}>{catMap.category_name}</option>)
        })
    }

    renderInputList = () => {
        if(this.state.input === true){
            return (
                <tr>
                    <th scope="col"></th>
                    <th scope="col"><input ref={input => this.product_name = input} className="form-control" type="text" /></th>
                    <th scope="col">
                        <select class="form-control" ref={input => {this.category = input}}>
                                {this.renderCategory()}
                        </select>
                    </th>
                    <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                    <th scope="col"><input ref={input => this.stock = input} className="form-control" type="text" /></th>
                    <th scope="col"></th>
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
            if(item.id !== this.state.edit){
                return this.state.category.map( catMap => {
                    if(item.category_id === catMap.id){
                        if (item.id !== this.state.upload){
                            if (item.image) {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.product_name}</td>
                                        <td>{catMap.category_name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.stock}</td>
                                        <td>
                                            <img className='list' alt='' onClick={()=>{this.setState({upload : item.id})}} style={{width: 250, height: 200}} src={`http://localhost:2019/products/avatar/${item.image}`}/>
                                        </td>
                                        <td>            
                                            <Button color="danger" onClick={()=>{this.setState({edit : item.id})}}>Edit</Button>
                                            <button className = 'btn btn-warning m-1' onClick={()=>{this.deleteProduct(item)}}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.product_name}</td>
                                    <td>{catMap.category_name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.stock}</td>
                                    <td>
                                    <button onClick={()=>{this.setState({upload : item.id})}}>Upload</button>
                                    </td>
                                    <td>            
                                        <Button color="danger" onClick={()=>{this.setState({edit : item.id})}}>Edit</Button>
                                        <button className = 'btn btn-warning m-1' onClick={()=>{this.deleteProduct(item)}}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                        return(
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.product_name}</td>
                                <td>{catMap.category_name}</td>
                                <td>{item.price}</td>
                                <td>{item.stock}</td>
                                <td>
                                <input type='file' ref={input => {this.image = input}}/>
                                </td>
                                <td>            
                                    <button className = 'btn btn-danger m-1' onClick={()=>{this.uploadImage(item.id)}}>Save</button>
                                    <button className = 'btn btn-warning m-1' onClick={()=>{this.setState({upload : 0})}}>Cancel</button>
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
                            <select class="form-control" ref={input => {this.editCategory = input}} defaultValue={item.category_id}>
                                {this.renderCategory()}
                            </select>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editPrice = input}} type="text" defaultValue={item.price}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editStock = input}} type="text" defaultValue={item.stock}/>
                        </td>
                        <td>
                        </td>
                        <td>            
                            <button className = 'btn btn-danger m-1' onClick={()=>{this.saveProduct(item.id)}}>Save</button>
                            <button className = 'btn btn-warning m-1' onClick={()=>{this.setState({edit : 0})}}>Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
        
    }

    render () {
        if(this.state.filter){
            return (
                <div className="container mt-3">
                    <h1 className="display-4 text-center">Manage Product</h1>
                    <div class="input-group mb-10">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Nama Product</span>
                        </div>
                        <input type="text" class="form-control" ref={input => {this.nama = input}} placeholder="Nama product disini" aria-describedby="basic-addon1"/>
                        <div class="input-group-prepend">
                            <span class="input-group-text ml-2" id="basic-addon1">Category</span>
                        </div>
                        <input type="text" class="form-control" ref={input => {this.category = input}} placeholder="Category product disini" aria-describedby="basic-addon1"/>
                        <div class="input-group-prepend">
                            <span class="input-group-text ml-2" id="basic-addon1">Harga</span>
                        </div>
                        <input type="text" class="form-control" ref={input => {this.min = input}} placeholder="Masukan harga minimal product" aria-describedby="basic-addon1"/>
                        <input type="text" class="form-control" ref={input => {this.max = input}} placeholder="Masukan harga maximal product" aria-describedby="basic-addon1"/>
                        <button className='btn btn-success ml-2' onClick={()=>this.onBtnSearch()}>Search</button>
                        <img className='ml-2' style={{width: 35, height: 35}} alt='' src='https://image.flaticon.com/icons/svg/291/291202.svg' onClick={this.resetFilter} />
                    </div>
                    <button className='btn btn-block btn-success' onClick={()=>this.setState({input:!this.state.input})}>Add Product</button>
                    <br></br>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">PRODUCT NAME</th>
                                <th scope="col">CATEGORY</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">STOCK</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderInputList()}
                            {this.renderList()}
                        </tbody>
                    </table>
                </div>
            )
        }
        return (
            <div className="container mt-3">
                <h1 className="display-4 text-center">Manage Product</h1>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Nama Product</span>
                    </div>
                    <input type="text" class="form-control" ref={input => {this.nama = input}} placeholder="Nama product disini" defaultValue='' aria-describedby="basic-addon1"/>
                    <div class="input-group-prepend">
                        <span class="input-group-text ml-2" id="basic-addon1">Category</span>
                    </div>
                    <input type="text" class="form-control" ref={input => {this.category = input}} placeholder="Category product disini" defaultValue='' aria-describedby="basic-addon1"/>
                    <div class="input-group-prepend">
                        <span class="input-group-text ml-2" id="basic-addon1">Harga</span>
                    </div>
                    <input type="text" class="form-control" ref={input => {this.min = input}} placeholder="Masukan harga minimal product" defaultValue='' aria-describedby="basic-addon1"/>
                    <input type="text" class="form-control" ref={input => {this.max = input}} placeholder="Masukan harga maximal product" defaultValue='' aria-describedby="basic-addon1"/>
                    <button className='btn btn-success ml-2' onClick={()=>this.onBtnSearch()}>Search</button>
                </div>
                <button className='btn btn-block btn-success' onClick={()=>this.setState({input:!this.state.input})}>Add Product</button>
                <br></br>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">PRODUCT NAME</th>
                            <th scope="col">CATEGORY</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">STOCK</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderInputList()}
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


export default connect(mapStatetoProps)(ManageProduct)
