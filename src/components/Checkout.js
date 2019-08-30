import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alamat: [],
            select: [],
            payment: [],
            shipping: [],
            cart : [],
            user_cart : [],
            product : [],
            detail : [],
            badge : 0,
            selectPay: 0,
            selectedID: 0,
            input : false,
            modal: false,
            redirect: false
        };
    
        this.toggle = this.toggle.bind(this);
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    
    getProduct = () => {
        axios.get('http://localhost:2019/products')
        .then(res => {
            this.setState({product: res.data})
        })
    }
    
    getDetail = () => {
        axios.get('http://localhost:2019/detail')
        .then(res => {
            this.setState({detail: res.data})
        })
    }
    
    getCart = () => {
        axios.get(`http://localhost:2019/cart/`)
        .then(res=>{
        this.setState({cart: res.data})
        this.getBadge()
        this.getCartUser()
        })
    }
    
    getSelected = () => {
        axios.get('http://localhost:2019/select')
        .then(res => {
            this.setState({select: res.data})
            
        })
    }
    
    getAddress = () => {
        axios.get('http://localhost:2019/address')
        .then(res => {
            this.setState({alamat: res.data})
            this.getSelectedID()
        })
    }
    
    getShipping = () => {
        axios.get('http://localhost:2019/shipping')
        .then(res => {
            this.setState({shipping: res.data})
        })
    }
    
    getPayment = () => {
        axios.get('http://localhost:2019/payment')
        .then(res => {
            this.setState({payment: res.data})
        })
    }
    
    getBadge = () => {
        this.state.cart.map(cart => {
            if (cart.users_id === this.props.user.id) {
                this.setState({badge : this.state.badge+1})       
            }
        })
    }

    getCartUser = () => {
        const cart_filter = this.state.cart.filter(cart =>{
            if (cart.users_id === this.props.user.id) {
                return cart
            }
        })

        this.setState({user_cart : cart_filter})
        
    }
    
    getSelectedID = () => {
        this.state.alamat.map( add => {
            if (add.users_id === this.props.user.id) {
                if (add.selected === 1) {
                    this.setState({selectedID : add.id})
                }
            }
        })
    }

    componentDidMount(){
        this.getAddress()
        this.getSelected()
        this.getPayment()
        this.getShipping()
        this.getCart()
        this.getProduct()
        this.getDetail()
    }
    
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    
    selectedAddress = (id) =>{
        return this.state.select.map(select=>{
            if(select.users_id === this.props.user.id){
                axios.get('http://localhost:2019/addressselected/' + select.id + '/' + id)
                .then(res => {
                    alert('Alamat telah dirubah')
                    this.setState({modal:false})
                    this.getAddress()
                    this.getSelected()
                    this.setState({selectedID:id})
                })
            }
        })
    }

    selectAlamat = () => {
        return this.state.alamat.map( add => {
            if (add.users_id === this.props.user.id) {
                if (add.selected === 1) {
                    return (
                        <div className='container mb-3'  style={{borderStyle:"solid", borderColor:'lime'}}>
                            <div className='row'>
                                <div className="col-8">
                                    <p><b>{add.penerima}</b>  ({add.label})</p>
                                    <p>{add.alamat}</p>
                                    <p>{add.kota} | {add.kode_pos}</p>
                                </div>
                                <div className='col-4'>
                                </div>
                            </div>
                        </div>
                    )    
                }
                return (
                    <div className='container mb-3'  style={{borderStyle:"solid"}}>
                        <div className='row'>
                            <div className="col-8">
                                <p><b>{add.penerima}</b>  ({add.label})</p>
                                <p>{add.alamat}</p>
                                <p>{add.kota} | {add.kode_pos}</p>
                            </div>
                            <div className='col-4 align-self-center'>
                                <Button color='success' onClick={()=>{this.selectedAddress(add.id)}}>Pilih Alamat</Button>
                            </div>
                        </div>
                    </div>
                )      
            }
        })
    }

    renderAlamat = () => {
        if (this.state.input === false) {
            if (this.state.selectedID === 0) {
                return <h1>Masukan alamat / pilih alamat dahulu</h1>
            } 
            return this.state.alamat.map( add => {
                if (add.users_id === this.props.user.id) {
                    
                    if (add.selected === 1) {
                        return (
                            <div>
                                <p><b>{add.penerima}</b>  ({add.label})</p>
                                <p>{add.alamat}</p>
                                <p>{add.kota} | {add.kode_pos}</p>
                                <hr class="mb-4"></hr>
                            </div>
                        )   
                    }
                }
            })   
        }
    }

    inputAddress = () => {
        if(this.state.input === true){
            return (
                <form>
                    <div class="mb-3">
                        <label for="email">Label Alamat</label>
                        <input type="email" class="form-control" ref={input => {this.label = input} }/>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="firstName">Nama Penerima</label>
                            <input type="text" class="form-control" ref={input => {this.penerima = input} }/>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="lastName">Nomor Handpohone</label>
                            <input type="number" class="form-control" ref={input => {this.no_hp = input} }/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-9 mb-3">
                            <label for="firstName">Kota</label>
                            <input type="text" class="form-control" ref={input => {this.kota = input} }/>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="lastName">Kode Pos</label>
                            <input type="number" class="form-control" ref={input => {this.kode_pos = input} }/>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="email">Alamat</label>
                        <input type="email" class="form-control" ref={input => {this.alamat = input} }/>
                    </div>

                    <div class="mb-3">
                        <input type="checkbox" value="true" nama='select' ref={input=>{this.selected = input}}/> Jadikan alamat utama ?
                    </div>

                    <Button className='btn btn-block' onClick={()=>this.addAddress()}>Save</Button>
                    <hr class="mb-4"></hr>
                </form>
            )
        }
    }

    addAddress = () => {
        const users_id = this.props.user.id
        const label = this.label.value
        const penerima = this.penerima.value
        const no_hp = parseInt(this.no_hp.value)
        const kota = this.kota.value
        const kode_pos = parseInt(this.kode_pos.value)
        const alamat = this.alamat.value
        const selected = this.selected.checked
            
        axios.post('http://localhost:2019/addaddress',
        {
            users_id,
            label,
            penerima,
            no_hp,
            kota,
            kode_pos,
            alamat,
            selected
        }).then(res=>{
            console.log("data telah disimpan");
            console.log(res);
            this.getAddress()
            this.getSelected()
            this.setState({input:!this.state.input})
        })
    }

    renderShipping = () => {
        return this.state.shipping.map(ship=>{
            return (
                <div className='col-3 m-2 align-self-center'>
                    <input name="paymentMethod" type="radio" value={ship.id}/>{ship.nama_kurir}
                </div>
            )
        })
    }

    renderPayment = () => {
        return this.state.payment.map(pay=>{
            if(this.state.selectPay === pay.id){
                return (
                    <div className='card-body col-3 ' style={{borderStyle:"solid", borderColor:'lime'}} onClick={()=>{this.setState({selectPay:pay.id})}}>
                        <div className='card-body'>
                            <h3 className='card-title'>{pay.nama_bank}</h3>
                            <p className='card-text'>{pay.no_rek}</p>
                        </div>
                    </div>
                )
            }
            return (
                <div className='card-body col-3 text-center'  onClick={()=>{this.setState({selectPay:pay.id})}}>
                    <div className='card-body'>
                        <h3 className='card-title'>{pay.nama_bank}</h3>
                        <p className='card-text'>{pay.no_rek}</p>
                    </div>
                </div>
            )
        })
    }

    renderCart = () => {
        return this.state.cart.map (cart => {
        if(cart.users_id === this.props.user.id){
            return this.state.product.map (item => {
            if(cart.products_id === item.id){
                return (
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">{item.product_name}</h6>
                            <small class="text-muted">{item.detail}</small>
                        </div>
                        <span class="text-muted">Rp. {cart.qty * item.price }</span>
                    </li>
                )
            }
            })
        }
        })
    }

    totalHarga = () => { // Menjumlahkan Harga barang yang dibeli user
        var total = 0
        for (let i = 0; i < this.state.cart.length; i++) {
            if (this.state.cart[i].users_id === this.props.user.id) {
                for (let j = 0; j < this.state.product.length; j++) {
                    if (this.state.cart[i].products_id === this.state.product[j].id) {
                    const jumlah = this.state.cart[i].qty * this.state.product[j].price
                    total = total + jumlah        
                    }
                }                
            }
        }
        return (
            total
        )
    }

    letsgocheckout = async () => {
        var shipping_id = document.getElementsByName('paymentMethod')
            for(var i = 0; i < shipping_id.length; i++) { 
                if(shipping_id[i].checked) {
                    shipping_id = (shipping_id[i].value);
                }
            } 

        const address_id = this.state.selectedID
        const total_harga = this.totalHarga()
        const payment_id = this.state.selectPay
        const users_id = this.props.user.id

            console.log(`${shipping_id}, ${address_id}, ${payment_id}, ${total_harga}`)

        const resOrder = await axios.post('http://localhost:2019/addcheckout',{
            users_id,
            shipping_id,
            address_id,
            payment_id,
            total_harga
        })

        console.log(resOrder);

        let arrayCart = []
        let carts = this.state.user_cart
        console.log(carts);

        for(let i = 0; i < carts.length; i++) {
            arrayCart.push([carts[i].products_id, carts[i].qty, resOrder.data[0].id])
        }

        console.log(arrayCart);
    
        const resOrderDetail = await axios.post('http://localhost:2019/orderdetail', {arrayCart})
            
        alert(resOrderDetail)

        await axios.delete(`http://localhost:2019/hapuscart/${this.props.user.id}`)

        this.setRedirect()
    }

    handleInsertOrderDetail = (order_id) => {
        
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
    }

    render() {
        return (
        <div className='container mt-2 mb-5'>
            <div class="row">
                <div class="col-md-4 order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Your cart</span>
                    <span class="badge badge-secondary badge-pill">{this.state.badge}</span>
                </h4>
                <ul class="list-group mb-3">
                    {this.renderCart()}
                    <li class="list-group-item d-flex justify-content-between">
                    <span>Total (IDR)</span>
                    <strong>Rp. {this.totalHarga()}</strong>
                    </li>
                </ul>
                </div>
                <div class="col-md-8 order-md-1">
                <h4 class="mb-3 text-center">Billing Address</h4>
                <hr class="mb-4"></hr>
                {this.renderAlamat()}
                {this.inputAddress()}
                <form class="needs-validation" novalidate="">
                    <p className="row">
                        <Button className="col btn btn-secondary m-2" onClick={()=>this.setState({input:!this.state.input})}>Add Address</Button>
                        <Button className="col btn btn-secondary m-2" onClick={this.toggle}>Select Address</Button>
                    </p>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader className="align-self-center" toggle={this.toggle}><b>Alamat Pengiriman</b></ModalHeader>
                        <ModalBody>
                            {this.selectAlamat()}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Do Something</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <hr class="mb-4"></hr>
                    
                    <h4 class="mb-3 text-center align-self-center">Shipping</h4>
                    <div class="row">
                        {this.renderShipping()}
                    </div>
                    <hr class="mb-4"></hr>

                    <h4 class="mb-3 text-center ">Payment</h4>
                    <div className='row'>
                        {this.renderPayment()}
                    </div>
                    <hr class="mb-4"></hr>
                    <Button class="btn btn-primary btn-lg btn-block" onClick={()=>this.letsgocheckout()}>Continue to checkout</Button>
                </form>
                    {this.renderRedirect()}
                </div>
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

export default connect(mapStatetoProps)(checkout)