import React, { Component } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


class ManageProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            search_pro: [],
            category : [],
            search_cat : [],
            edit: 0,
            input : false,
            upload : 0,
            detail : false,
            pro_detail : false,
            modal: false
        };
    
        this.toggle = this.toggle.bind(this);
    }
    
    // state = {
    //     products: [],
    //     category : [],
    //     edit: 0,
    //     input : false,
    //     upload : 0,
    //     detail : false,
    // }

    componentDidMount(){
        this.getProduct()
        this.getCategory()
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal,
          detail: !prevState.detail
        }));
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
    
    getDetail = () => {
        axios.get('http://localhost:2019/detail')
            .then(res => {
               this.setState({pro_detail: res.data})
            })
    }

    addProduct = () => {
        const product_name = this.product_name.value
        const category_name = this.category.value
        const price = this.price.value
        const stock = this.stock.value
        
        axios.get('http://localhost:2019/categoryname?category_name='+category_name)
        .then(res=>{
            const category_id = res.data.id

            axios.post('http://localhost:2019/addproducts/',
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
        })
    }

    saveProduct = (item) => {
        const product_name = this.editProduct_name.value
        const category = this.editCategory.value
        const price = this.editPrice.value
        const stock = this.editStock.value
        
        axios.get('http://localhost:2019/categoryname?category_name='+category)
        .then(res=>{
            const category_id = res.data.id

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

    onBtnSearch = () => {
        const search = this.search.value
        const searchInput = this.searchInput.value
        console.log(search);
        console.log(searchInput);



        if(this.search.value === "Product Name"){
            var proSearch = this.state.search_pro.filter (item => {
                if(searchInput){
                    return(
                        item.product_name.toLowerCase().includes(searchInput.toLowerCase())
                    )
                }
            })
    
            this.setState({products: proSearch})
            this.setState({category: this.state.search_cat})
        }else if(this.search.value === "Category"){
            var catSearch = this.state.search_cat.filter (item => {
                if(searchInput){
                    return(
                        item.category_name.toLowerCase().includes(searchInput.toLowerCase())
                    )
                }
            })
    
            this.setState({category: catSearch})
            this.setState({products: this.state.search_pro})
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
            return (<option>{catMap.category_name}</option>)
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
                    <th scope='col'></th>
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

    renderDetail = () => {
        if(this.state.detail === true){
            return (
                <div className="container">
                    <table className="table table-hover mb-5">
                        <tr>
                            <th>
                                Informasi
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <input></input>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                Manfaat
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <input></input>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                Tips & Trick
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <input></input>
                            </th>
                        </tr>
                    </table>
                </div>
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
                                        <td>
                                            <button onClick={this.toggle}>Detail</button>
                                        </td>
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
                                    <td>
                                        <button onClick={this.toggle}>Detail</button>
                                    </td>
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
                                <td>
                                    <button onClick={this.toggle}>Detail</button>
                                </td>
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
                    return console.log("");
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
                            <select class="form-control" ref={input => {this.editCategory = input}}>
                                {this.renderCategory()}
                            </select>
                        </td>
                        <td>
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
    if(this.props.user.username === ''){
        return <h1> L o a d i n g . . . </h1>
    }
    return (
        <div className="container mt-3">
            <h1 className="display-4 text-center">List Product</h1>
            <div className="row">
                <select class="col-3 m-1 form-control" ref={input => {this.search = input}}>
                    <option>Product Name</option>
                    <option>Category</option>
                </select>
                <input className="col-4 m-1" ref={input => {this.searchInput = input}}></input>
                <button className="col-2 m-1"onClick={this.onBtnSearch}>Search</button>
                <button className="col-2 m-1 btn btn-outline-warning" onClick={()=>this.setState({input : !this.state.input})}>New Product</button>
            </div>
            <br></br>
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
                    {this.renderInputList()}
                    {this.renderList()}
                </tbody>
            </table>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>List Product</ModalHeader>
                <ModalBody>
                {this.renderDetail()}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
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
