import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ManageOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkout : [],
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
    }

    getCheckout = () => {
        axios.get('http://localhost:2019/checkout')
        .then(res=>
            this.setState({checkout:res.data})    
        )
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

    renderAddress =(id)=>{
        return this.state.address.map (add=> {
            if (id === add.id) {
                return(
                <div>
                    <p>
                        <b>{add.penerima}</b>
                    </p>
                    <p>{add.alamat}</p>
                    <p>{add.kota} | {add.kode_pos}</p>
                </div>
                )
            }
        })
    }

    ConfirmPayment = (id) => {
        axios.get('http://localhost:2019/confirmpayment/'+id)
        .then(
            document.location.reload(true),
            this.getCheckout()
        )
    }
    CancelPayment = (id) => {
        axios.delete('http://localhost:2019/checkout/receipt/'+id)
        .then(
            document.location.reload(true),
            this.getCheckout()
        )
    }
    
   
    renderOrder = (status) => {
        return this.state.checkout.map(co =>{
            if (co.order_status === status) {
        return this.state.shipping.map (ship=> {
            if (co.shipping_id === ship.id) {
        return this.state.payment.map (pay=> {
            if (co.payment_id === pay.id) {
            return (
                <div className='container mt-4' style={{borderStyle:"solid", borderColor:'AntiqueWhite'}}>
                    <div className='row mt-2'>
                        <div className='col-4 border-right'>
                            <h3>User ID : {co.users_id}</h3>    
                        </div>
                        <div className='col-6'>
                            <div>Username : </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row mt-2'>
                        <div className='col-3 border-right'>
                            <p className='align-self-center'>{co.CREATED_AT}</p>
                        </div>
                        <div className='col-3 borders'>
                            <div>Shipping : {ship.nama_kurir}</div>
                        </div>
                        <div className='col-3 borders'>
                            <div>Payment : {pay.nama_bank}</div>
                        </div>
                        <div className='col-3 border-left'>
                            <div>Total Belanja : Rp. {co.total_harga}</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row mb-3'>
                        <div className='col-5 border-right'>
                            <h3>Alamat Pengiriman</h3>
                            <hr></hr>
                            {this.renderAddress(co.address_id)}
                        </div>
                        <div className='col-5 borders'>
                        <img className='ml-2' style={{width: 200, height: 200}} alt='' src={`http://localhost:2019/checkout/receipt/${co.order_receipt}`} onClick={this.toggle} />
                        </div>
                        <div className='col-2 border-left'>
                        <Button className='btn btn-success m-2'onClick={()=>this.ConfirmPayment(co.id)}>Confirm</Button>
                        <Button className='btn btn-danger m-2'onClick={()=>this.CancelPayment(co.id)}>Cancel</Button>
                        </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>ORDER RECEIPT</ModalHeader>
                        <ModalBody>
                        <img className='ml-2' style={{width: 400, height: 400}} alt='' src={`http://localhost:2019/checkout/receipt/${co.order_receipt}`} />    
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={()=>this.ConfirmPayment(co.id)}>Confirm</Button>
                            <Button color="secondary" onClick={()=>{this.CancelPayment(co.id)}}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    </div>
                </div>
            )    
            }    
        })
            }    
        })
            }
        })
    }

    render(){
        return (
            this.renderOrder(this.props.status)
        )
    }
}



const mapStatetoProps = state => {
    return {
        admin: state.admin
    }
}


export default connect(mapStatetoProps)(ManageOrder)