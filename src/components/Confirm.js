import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Confirm extends Component {
    state = {
        checkout : [],
        address : [],
        shipping : [],
        payment : [],
        redirect: false
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    componentDidMount(){
        this.getCheckout()
        this.getAddress()
        this.getPayment()
        this.getShipping()
    }

    getCheckout = () => {
        let users_id = this.props.match.params.users_id

        axios.get('http://localhost:2019/pendingpayment/' + users_id)
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

    renderAddress =()=>{
        return this.state.checkout.map (co=> {
            if (co.users_id === this.props.user.id) {
        return this.state.address.map (add=> {
            if (co.address_id === add.id) {
                return(
                    <div className='card-body mb-4' style={{borderStyle:"solid", borderColor:'AntiqueWhite'}}>
                        <div className='card-body'>
                            <p  className='card-title text-center'>
                                <h3>{add.penerima}</h3>
                            </p>
                            <p>{add.alamat}</p>
                            <p>{add.kota} | {add.kode_pos}</p>
                        </div>
                    </div>
                )
            }
        })
            }
        })
    }

    renderShipping =()=>{
        return this.state.checkout.map (co=> {
            if (co.users_id === this.props.user.id) {
        return this.state.shipping.map (ship=> {
            if (co.shipping_id === ship.id) {
                return(
                    <div className='card-body mb-4' style={{borderStyle:"solid", borderColor:'AntiqueWhite'}}>
                        <div className='card-body'>
                            <h3 className='card-title text-center'>{ship.nama_kurir}</h3>
                        </div>
                    </div>
                )
            }
        })
            }
        })
    }

    renderPayment =()=>{
        return this.state.checkout.map (co=> {
            if (co.users_id === this.props.user.id) {
        return this.state.payment.map (pay=> {
            if (co.payment_id === pay.id) {
                return(
                    <div className='card-body ' style={{borderStyle:"solid", borderColor:'AntiqueWhite'}}>
                        <div className='card-body'>
                            <h3 className='card-title text-center'>{pay.nama_bank}</h3>
                            <p className='card-text text-center'>{pay.no_rek}</p>
                        </div>
                    </div>
                )
            }
        })
            }
        })
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
            this.setRedirect()
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={'/OrderHistory/' + this.props.user.id} />
        }
    }

    render() {
        return this.state.checkout.map (co=> {
            if (co.users_id === this.props.user.id) {
                return (
                    <div className='container mt-2 mb-5'>
                        
                        <form class="needs-validation" novalidate="">
                            <hr class="mb-4"></hr>
                            <h4 class="mb-3 text-center align-self-center">Billing Address</h4>
                            <div class="row">
                            {this.renderAddress()}
                            </div>

                            <h4 class="mb-3 text-center align-self-center">Shipping</h4>
                            <div class="row">
                                {this.renderShipping()}
                            </div>

                            <h4 class="mb-3 text-center ">Payment</h4>
                            <div className='row'>
                                {this.renderPayment()}
                            </div>
                            <hr class="mb-4"></hr>

                            <h4 class="mb-3 text-center ">Total Harga</h4>
                            <div className='row'>
                                <div className='card-body ' style={{borderStyle:"solid", borderColor:'AntiqueWhite'}}>
                                    <div className='card-body'>
                                        <h3 className='card-title text-center'>Rp. {co.total_harga}</h3>
                                    </div>
                                </div>
                            </div>
                            <hr class="mb-4"></hr>

                            <h4 class="mb-3 text-center ">Konfirmasi Pembayaran</h4>
                            <div className='row'>
                                <input type='file' ref={input => {this.image = input}}></input>
                            </div>
                            <hr class="mb-4"></hr>
                            <Button class="btn btn-primary btn-lg btn-block" onClick={()=>{this.uploadImage(co.id)}}>Continue to checkout</Button>
                        </form>
                        {this.renderRedirect()}
                </div>
                )
            }
        })
    }
}

const mapStatetoProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStatetoProps)(Confirm)