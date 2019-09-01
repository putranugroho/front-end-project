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

    uploadImage = (id) => {
        const formData = new FormData()
        const image = this.image.files[0]
        
        formData.append('image', image)
        formData.append('id', id)

        axios.post('http://localhost:2019/checkout/receipt', formData
        ).then(res=>{
            alert('Gambar berhasil di upload')
            console.log(res.data);
            document.location.reload(true)
        })
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
                        <a href={'/confirm/'+this.props.user.id}><button className='btn btn-primary btn-block'>Checkout</button></a>
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
                                <center><h2 style={{color:'MediumBlue'}}>Bukti Pembayaran anda telah kami terima, Order akan segera diproses</h2></center>
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
            }else if(co.order_status === 'Transaksi Ditolak'){
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
                            <h5>Order Receipt : </h5>
                            <input type='file' ref={input => {this.image = input}}></input>
                            </div>
                            <div className='col border-left'>
                            <center><h2 style={{color:'red'}}>Transaksi anda telah dibatalkan</h2></center>
                            <button class="btn btn-primary btn-lg btn-block" onClick={()=>{this.uploadImage(co.id)}}>Upload Gambar</button>
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

    sortOrder = () => {
        const order = this.order.value
        const urutan = this.urutan.value

        console.log(order);
        console.log(urutan);
        

        axios.post('http://localhost:2019/sortcheckout/'+this.props.user.id,{
            order,
            urutan
        }).then(res=>
            this.setState({checkout:res.data})
        )

    }

    render(){
        return (
            <div className='container'>
                <hr></hr>
                <h1><center>Order History</center></h1>
                <div className='row'>
                    <span className='col-1 text-center align-self-center'>Sort By : </span>
                    <div className='col-5' >
                        <select class="form-control" ref={input => this.order = input}>
                            <option value='CREATED_AT'>Created At</option>
                            <option value='UPDATED_AT'>Updated At</option>
                            <option value='order_status'>Order Status</option>
                        </select>
                    </div>
                    <div className='col-5'>
                        <select className='form-control' ref={input => this.urutan = input}>
                            <option>ASC</option>
                            <option>DESC</option>
                        </select>
                    </div>
                    <button className='btn btn-success' onClick={()=>this.sortOrder()}>Filter</button>
                </div>
                {this.renderOrder()}
            </div>
            
        )
    }
}



const mapStatetoProps = state => {
    return {
        user: state.auth
    }
}


export default connect(mapStatetoProps)(OrderHistory)