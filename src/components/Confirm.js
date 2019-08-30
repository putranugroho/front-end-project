import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Confirm extends Component {
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
                    {/* {this.renderCart()} */}
                    <li class="list-group-item d-flex justify-content-between">
                    <span>Total (IDR)</span>
                    <strong>Rp. </strong>
                    {/* {this.totalHarga()} */}
                    </li>
                </ul>
                </div>
                <div class="col-md-8 order-md-1">
                <h4 class="mb-3 text-center">Billing Address</h4>
                <hr class="mb-4"></hr>
                {/* {this.renderAlamat()}
                {this.inputAddress()} */}
                <form class="needs-validation" novalidate="">
                    <p className="row">
                        <Button className="col btn btn-secondary m-2" onClick={()=>this.setState({input:!this.state.input})}>Add Address</Button>
                        <Button className="col btn btn-secondary m-2" onClick={this.toggle}>Select Address</Button>
                    </p>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader className="align-self-center" toggle={this.toggle}><b>Alamat Pengiriman</b></ModalHeader>
                        <ModalBody>
                            {/* {this.selectAlamat()} */}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Do Something</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <hr class="mb-4"></hr>
                    
                    <h4 class="mb-3 text-center align-self-center">Shipping</h4>
                    <div class="row">
                        {/* {this.renderShipping()} */}
                    </div>
                    <hr class="mb-4"></hr>

                    <h4 class="mb-3 text-center ">Payment</h4>
                    <div className='row'>
                        {/* {this.renderPayment()} */}
                    </div>
                    <hr class="mb-4"></hr>
                    <button class="btn btn-primary btn-lg btn-block" type="submit" onClick={()=>this.letsgocheckout()}>Continue to checkout</button>
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

export default connect(mapStatetoProps)(Confirm)