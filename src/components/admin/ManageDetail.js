import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'


class ManageDetail extends Component {
    
    state = {
        products: [],
        detail: [],
        edit : 0,
        input : 0
    }

    componentDidMount(){
        this.getDetail()
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
            .then(res => {
               this.setState({products: res.data, edit : 0, input : 0})
            })
    }

    getDetail = () => {
        axios.get('http://localhost:2019/detail')
            .then(res => {
               this.setState({detail: res.data, edit : 0, input : 0})
            })
    }

    addDetail = () => {
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

    saveDetail = (item) => {
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

    renderList = () => {
        return this.state.products.map (item => {
            return this.state.detail.map (detail => {
                if (item.detail_id === detail.id){
                    return (
                        <tr>
                            <th>{detail.id}</th>
                            <th>{item.product_name}</th>
                            <th>{detail.informasi}</th>
                            <th>{detail.manfaat}</th>
                            <th>{detail.tips}</th>
                            <th>
                                <button>Edit</button>
                                <button>Delete</button>
                            </th>
                        </tr>
                    )
                }
                    return (
                        <tr>
                            <th>{item.id}</th>
                            <th>{item.product_name}</th>
                            <th><input></input></th>
                            <th><input></input></th>
                            <th><input></input></th>
                            <th>
                                <button>Add</button>
                                <button>Delete</button>
                            </th>
                        </tr>
                    )
            })
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
                            <th scope="col">INFORMASI</th>
                            <th scope="col">MANFAAT</th>
                            <th scope="col">TIPS & TRICK</th>
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
