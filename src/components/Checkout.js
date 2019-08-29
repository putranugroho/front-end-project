import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alamat: [],
            selectedID:0,
            modal: false
        };
    
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount(){
        this.getAddress()
    }

    getSelected = () => {
        
    }

    getAddress = () => {
        axios.get('http://localhost:2019/address')
        .then(res => {
            this.setState({alamat: res.data})
        })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    selectedAddress = () =>{
        
    }

    selectAlamat = () => {
        return this.state.alamat.map( add => {
            console.log(this.state.selectedID);
            
            if (add.user_id === this.props.user.id) {
                if (add.selected === 1) {
                    this.setState({selectedID:add.id})
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
                                <Button color='success' onClick>Pilih Alamat</Button>
                            </div>
                        </div>
                    </div>
                )      
            }
        })
    }

    renderAlamat = () => {
        return this.state.alamat.map( add => {
            if (add.user_id === this.props.user.id) {
                if (add.selected === 1) {
                    return (
                        <div>
                            <p><b>{add.penerima}</b>  ({add.label})</p>
                            <p>{add.alamat}</p>
                            <p>{add.kota} | {add.kode_pos}</p>
                        </div>
                    )    
                }
                
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
                        <span class="badge badge-secondary badge-pill">3</span>
                    </h4>
                    <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">Product name</h6>
                            <small class="text-muted">Brief description</small>
                        </div>
                        <span class="text-muted">$12</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">Second product</h6>
                            <small class="text-muted">Brief description</small>
                        </div>
                        <span class="text-muted">$8</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">Third item</h6>
                            <small class="text-muted">Brief description</small>
                        </div>
                        <span class="text-muted">$5</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>$20</strong>
                        </li>
                    </ul>
                    </div>
                    <div class="col-md-8 order-md-1">
                    <h4 class="mb-3">Billing Address</h4>
                    <hr class="mb-4"></hr>
                    {this.renderAlamat()}
                    <hr class="mb-4"></hr>
                    <form class="needs-validation" novalidate="">
                        <div class="mb-3">
                        <label for="address">Address</label>
                        <input type="text" class="form-control" id="address" placeholder="1234 Main St" required=""/>
                        <div class="invalid-feedback">
                            Please enter your shipping address.
                        </div>
                        </div>

                        <div class="mb-3">
                        <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                        <input type="text" class="form-control" id="address2" placeholder="Apartment or suite"/>
                        </div>

                        <div class="row">
                        <div class="col-md-5 mb-3">
                            <label for="country">Country</label>
                            <select class="custom-select d-block w-100" id="country" required="">
                            <option value="">Choose...</option>
                            <option>United States</option>
                            </select>
                            <div class="invalid-feedback">
                            Please select a valid country.
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="state">State</label>
                            <select class="custom-select d-block w-100" id="state" required="">
                            <option value="">Choose...</option>
                            <option>California</option>
                            </select>
                            <div class="invalid-feedback">
                            Please provide a valid state.
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="zip">Zip</label>
                            <input type="text" class="form-control" id="zip" placeholder="" required=""/>
                            <div class="invalid-feedback">
                            Zip code required.
                            </div>
                        </div>
                        </div>
                        <hr class="mb-4"></hr>
                        <p className="row">
                            <button className="col btn btn-secondary m-2">Add Address</button>
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
                        
                        <h4 class="mb-3">Shipping</h4>
                        
                        <hr class="mb-4"></hr>

                        <h4 class="mb-3">Payment</h4>

                        <div class="d-block my-3">
                        <div class="custom-control custom-radio">
                            <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked="" required=""/>
                            <label class="custom-control-label" for="credit">Credit card</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required=""/>
                            <label class="custom-control-label" for="debit">Debit card</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required=""/>
                            <label class="custom-control-label" for="paypal">Paypal</label>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="cc-name">Name on card</label>
                            <input type="text" class="form-control" id="cc-name" placeholder="" required=""/>
                            <small class="text-muted">Full name as displayed on card</small>
                            <div class="invalid-feedback">
                            Name on card is required
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="cc-number">Credit card number</label>
                            <input type="text" class="form-control" id="cc-number" placeholder="" required=""/>
                            <div class="invalid-feedback">
                            Credit card number is required
                            </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-md-3 mb-3">
                            <label for="cc-expiration">Expiration</label>
                            <input type="text" class="form-control" id="cc-expiration" placeholder="" required=""/>
                            <div class="invalid-feedback">
                            Expiration date required
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="cc-expiration">CVV</label>
                            <input type="text" class="form-control" id="cc-cvv" placeholder="" required=""/>
                            <div class="invalid-feedback">
                            Security code required
                            </div>
                        </div>
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