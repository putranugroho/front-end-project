import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button } from 'reactstrap';


class ManageCategory extends Component {
    
   state = {
        category: [],
        edit : 0,
        input : 0
    }

    componentDidMount(){
        this.getCategory()
    }

    getCategory = () => {
        axios.get('http://localhost:2019/category')
            .then(res => {
               this.setState({category: res.data, edit : 0, input : 0})
            })
    }

    addCategory = () => {
        const category_name = this.category_name.value
        
        axios.post(
            'http://localhost:2019/addcategory',
            {
                category_name
            }
        ).then( (res) => {
            console.log('Data berhasil di input')
            console.log(res)
            this.getCategory()
        }).catch( (err) => {
            console.log('Gagal post data')
            console.log(err)
        })
    }

    deleteCategory = (item) => {
        axios.delete('http://localhost:2019/category/'+item.id).then(res=>{
            console.log("data telah dihapus");
            console.log(res);
            this.getCategory() 
        })
    }

    saveCategory = (item) => {
        const category_name = this.category_name.value
        
        axios.patch('http://localhost:2019/category/'+item.id,
        {
            category_name
        }).then(res=>{
            console.log("data telah disimpan");
            console.log(res);
            this.getCategory()
        })
    }

    renderInputList = () => {
        if(this.state.input === true){
            return (
                <tr>
                    <th scope="col"></th>
                    <th scope="col"><input ref={input => this.category_name = input} className="form-control" type="text" /></th>
                    <th scope="col">
                        <button className="btn btn-warning" onClick={this.addCategory}>Add</button>
                        <button className="btn btn-danger" onClick={()=>this.setState({input : false})}>Cancel</button>
                    </th>
                </tr>
            )
        }
    }

    renderList = () => {
        return this.state.category.map( item => { // {id, name, price, desc, src}
            if(item.id !== this.state.edit){
                return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.category_name}</td>
                    <td>            
                        <Button color="danger" onClick={()=>{this.setState({edit : item.id})}}>Edit</Button>
                        <button className = 'btn btn-warning m-1' onClick={()=>{this.deleteCategory(item)}}>Delete</button>
                    </td>
                </tr>
                )
            } else {
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>
                            <input className="form-control" ref={input => {this.editNama = input}} type="text" defaultValue={item.category_name}/>
                        </td>
                        <td>            
                            <button className = 'btn btn-danger m-1' onClick={()=>{this.saveCategory(item)}}>Save</button>
                            <button className = 'btn btn-warning m-1' onClick={()=>{this.setState({selectedID : 0})}}>Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
        
    }

    render () {
        return (
            <div className="container">
                <h1 className="display-4 text-center">Manage Category</h1>
                <button className='btn btn-block btn-success' onClick={()=>this.setState({input:!this.state.input})}>Add Product</button>
                <br></br>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAMA CATEGORY</th>
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


export default connect(mapStatetoProps)(ManageCategory)
