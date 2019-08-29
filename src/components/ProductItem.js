import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

class ProductItem extends Component {

    refresh = (reload) => {
        document.location.reload(reload)
    }

    addToCart = () => {
        const user_id = this.props.user.id
        const qty = parseInt(this.qty.value)
        var {id,stock} = this.props.items
        
        // JAWAWAB SOAL NOMER 1 & 2
        // melakukan validasi apakah user telah login & memasukan qty saat menekan "Add to Cart"
        if(qty > 0 && user_id !== ""){
                axios.get(
                    'http://localhost:2019/cart/'+user_id+'/'+id
                ).then( res => {
                    
                    if(res.data.length > 0){     
                        const totalQty = parseInt(res.data[0].qty) + (qty)  
                        if (totalQty<=stock) { // mengecek apakah qty yg dibeli melebihi stock barang
                            axios.patch('http://localhost:2019/cart/'+res.data[0].id,
                            { // jika user tsb telah memasukan product tersebut maka jumlah qty akan di update
                                qty : totalQty
                            }).then(res=>{
                                alert('UPDATE: quantity product telah ditambahkan')
                                document.location.reload(true)
                            })
                        } else {
                            alert('Stock yang tersedia tidak mencukupi')
                        }
                    } else { // jika belum ada productnya maka akan menambahkan product baru kedalam Cart
                        axios.post('http://localhost:2019/addcart',
                        {
                            users_id : user_id,
                            products_id : id,
                            qty : qty
                        }).then(res=>{
                            alert('NEW: product baru telah dimasukan kedalam cart')
                            document.location.reload(true)
                        })
                    }
                })    
        } else {
            if(user_id === ""){ // memunculkan alert jika blom login
                return (
                    alert('Silahkan login terlebih dahulu untuk melanjutkan transaksi'),
                    <Redirect to='/login'/>
                )
                
                
            } else{ // memunculkan alert jika belom memasukan qty
                alert('masukan jumlah barang yang ingin dibeli')
            }
            
        }
        return (
            this.qty.value = 0
        )
    }

    render () {
        var {id,product_name,price,image} = this.props.items
            return (
                <div className='card-body col-3 text-center'>
                    <img className='list' alt='' style={{width: 150, height: 150}} src={`http://localhost:2019/products/avatar/${image}`}/>
                        <div className='card-body'>
                            <h5 className='card-title'>{product_name}</h5>
                            <p className='card-text'>Rp. {price}</p>
                            <input className="form-control" ref={input => {this.qty = input}} type="text" defaultValue='0'/>
                            <Link to={'/detailproduct/' + id}>
                            <button className='btn btn-outline-primary btn-block'>Detail</button>
                            </Link>
                            <button className='btn btn-primary btn-block' onClick={()=>{this.addToCart(this.props.items)}} >Add To Cart</button>
                        </div>
                </div>
            )
    }
}

const mapStatetoProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStatetoProps)(ProductItem)