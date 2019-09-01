import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkout : [],
            product : [],
            orderdetail : [],
            payment : [],
            shipping : [],
            address : [],
            modal: false
        };
    
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    componentDidMount(){
        this.getCheckout()
        this.getAddress()
        this.getPayment()
        this.getShipping()
        this.getProduct()
        this.getOrderDetail()
    }

    getCheckout = () => {
        let users_id = this.props.match.params.users_id

        axios.get('http://localhost:2019/checkout/' + users_id)
        .then(res => {
            this.setState({checkout: res.data})
            console.log(res.data);
        })
    }
    getAddress = () => {
        axios.get('http://localhost:2019/address')
        .then(res=> this.setState({address:res.data}))
    }
    getShipping = () => {
        axios.get('http://localhost:2019/shipping')
        .then(res=> this.setState({shipping:res.data}))
    }
    getPayment = () => {
        axios.get('http://localhost:2019/payment')
        .then(res=> this.setState({payment:res.data}))
    }
    getProduct = () => {
        axios.get('http://localhost:2019/products')
        .then(res=> this.setState({product:res.data}))
    }
    getOrderDetail = () => {
        axios.get('http://localhost:2019/orderdetail')
        .then(res=> this.setState({orderdetail:res.data}))
    }

    renderCart = (id) =>{
        return this.state.orderdetail.map (od=> {
        if (id === od.checkout_id) {
            return this.state.product.map (item => {
                if (od.products_id === item.id) {
                return(
                <div className='container'>
                    <div className='row mt-4'>
                        <div className='col-2 border-right'>
                        <img className='justify-contain-center ' style={{width: 100, height: 75}} src={`http://localhost:2019/products/avatar/${item.image}`}/>
                        </div>
                        <div className='col-8 borders'>
                            <div className='mb-3'>
                                <center><h4>{item.product_name}</h4></center>
                            </div>
                            <div  className='mb-3'>{item.detail}</div>
                            <div className='row'>
                            <small className='col-4 border-right'>{item.price}</small>
                            <small className='col-8 border-left'>{od.qty_order}</small>
                            </div>
                        </div>
                        <div className='col-2'>
                            <div>Total Harga Produk</div>
                            <div>Rp. {item.price*od.qty_order}</div>
                        </div>
                    </div>
                <hr className='mb-2'></hr>
                </div>
                )   
            }
            })
        }
        })
    }
       
    renderOrder = () => {
    return this.state.checkout.map(co =>{
    return this.state.payment.map (pay=> {
        if (co.payment_id === pay.id) {
    return this.state.shipping.map (ship=> {
        if (co.shipping_id === ship.id) {
            if(co.order_status === 'Transaksi Pending'){
            return (
                <div className='container mt-4' style={{borderStyle:"solid", borderColor:'Yellow'}}>
                    <div className='row mt-2'>
                        <div className='col-6 border-right'>
                            <p className='align-self-center'>Created At : {co.CREATED_AT}</p>
                        </div>
                        <div className='col-6 border-right'>
                            <p className='align-self-center'>Updated At : {co.UPDATED_AT}</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row mt-2'>
                        <div className='col-3 borders'>
                            <div>Order Status : {co.order_status}</div>
                        </div>
                        <div className='col-3 borders'>
                            <div>Shipping : {ship.nama_kurir}</div>
                        </div>
                        <div className='col-3 borders'>
                            <div>Payment : {pay.nama_bank}</div>
                        </div>
                        <div className='col-3 border-left'>
                            <div>Total Belanja : <div>Rp. {co.total_harga}</div></div>
                        </div>
                    </div>
                    <hr></hr>
                        {this.renderCart(co.id)}
                    <div className='row mb-3'>
                        <div className='col'>
                        <center><h2 style={{color:'red'}}>Silahkan lanjutkan transaksi dulu sebelum belanja lagi</h2></center>
                        </div>
                    </div>
                </div>
            )
            }else if(co.order_status === 'Transaksi Dibayar'){
                return (
                    <div className='container mt-4' style={{borderStyle:"solid", borderColor:'MediumBlue'}}>
                        <div className='row mt-2'>
                            <div className='col-6 border-right'>
                                <p className='align-self-center'>Created At : {co.CREATED_AT}</p>
                            </div>
                            <div className='col-6 border-right'>
                                <p className='align-self-center'>Updated At : {co.UPDATED_AT}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row mt-2'>
                            <div className='col-3 borders'>
                                <div>Order Status : {co.order_status}</div>
                            </div>
                            <div className='col-3 borders'>
                                <div>Shipping : {ship.nama_kurir}</div>
                            </div>
                            <div className='col-3 borders'>
                                <div>Payment : {pay.nama_bank}</div>
                            </div>
                            <div className='col-3 border-left'>
                                <div>Total Belanja : <div>Rp. {co.total_harga}</div></div>
                            </div>
                        </div>
                        <hr></hr>
                            {this.renderCart(co.id)}
                        <div className='row mb-3'>
                            <div className='col border-right'>
                                <h5>Order Receipt : </h5>
                                <img className='ml-2' style={{width: 200, height: 200}} alt='' src={`http://localhost:2019/checkout/receipt/${co.order_receipt}`} />
                            </div>
                            <div className='col border-left'>
                                <center><h2 style={{color:'Lime'}}>Bukti Pembayaran anda telah kami terima, Order akan segera diproses</h2></center>
                            </div>
                        </div>
                    </div>
                )
            }else if(co.order_status === 'Transaksi Selesai'){
                return (
                    <div className='container mt-4' style={{borderStyle:"solid", borderColor:'Lime'}}>
                        <div className='row mt-2'>
                            <div className='col-6 border-right'>
                                <p className='align-self-center'>Created At : {co.CREATED_AT}</p>
                            </div>
                            <div className='col-6 border-right'>
                                <p className='align-self-center'>Updated At : {co.UPDATED_AT}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row mt-2'>
                            <div className='col-3 borders'>
                                <div>Order Status : {co.order_status}</div>
                            </div>
                            <div className='col-3 borders'>
                                <div>Shipping : {ship.nama_kurir}</div>
                            </div>
                            <div className='col-3 borders'>
                                <div>Payment : {pay.nama_bank}</div>
                            </div>
                            <div className='col-3 border-left'>
                                <div>Total Belanja : <div>Rp. {co.total_harga}</div></div>
                            </div>
                        </div>
                        <hr></hr>
                            {this.renderCart(co.id)}
                        <div className='row mb-3'>
                            <div className='col border-right'>
                                <h5>Order Receipt : </h5>
                                <img className='ml-2' style={{width: 200, height: 200}} alt='' src={`http://localhost:2019/checkout/receipt/${co.order_receipt}`} />
                            </div>
                            <div className='col border-left'>
                                <center><h2 style={{color:'Lime'}}>Transaksi anda telah berhasil diproses</h2></center>
                            </div>
                        </div>
                    </div>
                )
            }else if(co.order_status === 'Transaksi Dibatalkan'){
                return (
                    <div className='container mt-4' style={{borderStyle:"solid", borderColor:'Red'}}>
                        <div className='row mt-2'>
                            <div className='col-6 border-right'>
                                <p className='align-self-center'>Created At : {co.CREATED_AT}</p>
                            </div>
                            <div className='col-6 border-left'>
                                <p className='align-self-center'>Updated At : {co.UPDATED_AT}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row mt-2'>
                            <div className='col-3 borders'>
                                <div>Order Status : {co.order_status}</div>
                            </div>
                            <div className='col-3 borders'>
                                <div>Shipping : {ship.nama_kurir}</div>
                            </div>
                            <div className='col-3 borders'>
                                <div>Payment : {pay.nama_bank}</div>
                            </div>
                            <div className='col-3 border-left'>
                                <div>Total Belanja : <div>Rp. {co.total_harga}</div></div>
                            </div>
                        </div>
                        <hr></hr>
                            {this.renderCart(co.id)}
                        <div className='row mb-3'>
                            <div className='col border-right'>
                            <img className='ml-2' style={{width: 200, height: 200}} alt='' src={`http://localhost:2019/checkout/receipt/${co.order_receipt}`} onClick={this.toggle} />
                            </div>
                            <div className='col border-left'>
                            <h5>Order Receipt : </h5>
                                <center><h2 style={{color:'red'}}>Transaksi anda telah dibatalkan</h2></center>
                            </div>
                        </div>
                    </div>
                )
            }
        }    
    })
        }    
    })
    })
    }

    render(){
        return (
            <div className='container'>
                <hr></hr>
                <h1><center>Order History</center></h1>
                <div className='row'>
                    <span className='col-1 text-center align-self-center'>Sort By : </span>
                    <div className='col-5'>
                        <select class="form-control">
                            <option></option>
                        </select>
                    </div>
                    <div className='col-5'>
                        <select className='form-control'>
                            <option>ASC</option>
                            <option>DESC</option>
                        </select>
                    </div>
                    <button className='btn btn-success'>Filter</button>
                </div>
                {this.renderOrder()}
            </div>
            
        )
    }
}



const mapStatetoProps = state => {
    return {
        admin: state.admin
    }
}


export default connect(mapStatetoProps)(OrderHistory)