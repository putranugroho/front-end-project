import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
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
            product : [],
            detail : [],
            badge : 0,
            selectPay: 0,
            selectedID: 0,
            input : false,
            modal: false
        };
    
        this.toggle = this.toggle.bind(this);
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
        axios.get('http://localhost:2019/cart')
        .then(res => {
            this.setState({cart: res.data})
            this.getBadge()
        })
    }

    getSelected = () => {
        axios.get('http://localhost:2019/select/')
        .then(res => {
            this.setState({select: res.data})
        })
    }
    
    getAddress = () => {
        axios.get('http://localhost:2019/address')
        .then(res => {
            this.setState({alamat: res.data})
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
        
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    selectedAddress = (id) =>{
        return this.state.select.map(select=>{
            if(select.user_id === this.props.user.id){
                axios.get('http://localhost:2019/addressselected/' + select.id + '/' + id)
                .then(res => {
                    alert('Alamat telah dirubah')
                    this.setState({modal:false})
                    this.getAddress()
                    this.getSelected()
                    this.setState({selectedID:select.id})
                })
            }
        })
    }

    selectAlamat = () => {
        return this.state.alamat.map( add => {
            if (add.user_id === this.props.user.id) {
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
            return this.state.alamat.map( add => {
                if (add.user_id === this.props.user.id) {
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
        const user_id = this.props.user.id
        const label = this.label.value
        const penerima = this.penerima.value
        const no_hp = parseInt(this.no_hp.value)
        const kota = this.kota.value
        const kode_pos = parseInt(this.kode_pos.value)
        const alamat = this.alamat.value
        const selected = this.selected.checked
        
            
        axios.post('http://localhost:2019/addaddress',
        {
            user_id,
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
            this.setState({input:!this.state.input})
        })
    }

    renderShipping = () => {
        return this.state.shipping.map(ship=>{
            return (
                <div className='col-3 m-2 align-self-center'>
                    <input name="paymentMethod" type="radio" />{ship.nama_kurir}
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
                
                // return this.state.detail.map (detail => {
                // if(item.detail_id === detail.id){
                    return (
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 class="my-0">{item.product_name}</h6>
                                {/* <small class="text-muted">{detail.informasi}</small> */}
                            </div>
                            <span class="text-muted">Rp. {cart.qty * item.price }</span>
                        </li>
                    )
                // }
                // })
            }
            })
        }
        })
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
                    <span>Total (USD)</span>
                    <strong>$20</strong>
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
                    <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
                </form>
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