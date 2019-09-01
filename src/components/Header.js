import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogoutUser, onLogoutAdmin } from '../action'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Collapse, Navbar, NavbarToggler, Nav, NavItem,
    NavLink, UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem 
} from 'reactstrap';
import { async } from 'q';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : [],
            cart : [],
            badge : 0,
            modal : false,
            isOpen : false
          };
      
        this.toggleModal = this.toggleModal.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount(){
        this.getProduct()
        this.getCart()
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
            .then(res => {
               this.setState({products: res.data})
            })
    }

    getCart = async () => {
        await axios.get('http://localhost:2019/cart')
            .then(res => {
                this.setState({cart: res.data})
                this.getBadge()
            })
    }

    toggleModal() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    getBadge = async () => {
        await this.state.cart.map(cart => {
            if (cart.users_id === this.props.user.id) {
                    this.setState({badge : this.state.badge+1})       
            }
        })
    }

    logoutUser = () => {
        this.props.onLogoutUser()
    }
    logoutAdmin = () => {
        this.props.onLogoutAdmin()
    }

    addQty = (product, cart) => {
        const user_id = this.props.user.id
        const {products_id} = cart
        const {stock} = product

        axios.get(
            'http://localhost:2019/cart/' + user_id + '/' + products_id
        ).then( res => {
            const totalQty = parseInt(res.data[0].qty) + 1  
            if (totalQty<=stock) { // mengecek apakah qty yg dibeli melebihi stock barang
                axios.patch('http://localhost:2019/cart/'+res.data[0].id,
                { // jika user tsb telah memasukan product tersebut maka jumlah qty akan di update
                    qty : totalQty
                }).then(res=>{
                    this.getCart()
                })
            } else {
                alert('Stock yang tersedia tidak mencukupi')
            }
        })
    }

    minQty = (cart) => {
        const user_id = this.props.user.id
        const {products_id} = cart

        axios.get(
            'http://localhost:2019/cart/' + user_id + '/' + products_id
        ).then( res => {
            const totalQty = parseInt(res.data[0].qty) - 1  
            if (totalQty === 0) { // mengecek apakah qty yg dibeli melebihi stock barang
                axios.delete('http://localhost:2019/cart/'+res.data[0].id)
                .then(res=>{
                    this.getCart() 
                })                
            } else {
                axios.patch('http://localhost:2019/cart/'+res.data[0].id,
                { // jika user tsb telah memasukan product tersebut maka jumlah qty akan di update
                    qty : totalQty
                }).then(res=>{
                    this.getCart()
                })
            }
        })
    }

    deleteCart = (id) => {
        axios.delete('http://localhost:2019/cart/'+id)
        .then(res=>{
            this.getCart() 
        })
    }

    renderList = () => {
        return this.state.products.map(item=>{
            return this.state.cart.map(cart => {
                if(cart.users_id === this.props.user.id){
                    if(item.id === cart.products_id){
                        return(
                            <tr>
                                <td>{item.product_name}</td>
                                <td>{cart.qty}</td>
                                <td>Rp. {item.price}</td>
                                <td>Rp. {item.price*cart.qty}</td>
                                <td>
                                <img className='' style={{width: 15, height: 15}} alt='' src='https://image.flaticon.com/icons/svg/148/148782.svg' onClick={()=>{this.minQty(cart)}}/>
                                <img className='ml-2' style={{width: 15, height: 15}} alt='' src='https://image.flaticon.com/icons/svg/148/148781.svg' onClick={()=>{this.addQty(item,cart)}}/>
                                <img className='ml-2' style={{width: 15, height: 15}} alt='' src='https://image.flaticon.com/icons/svg/291/291202.svg' onClick={()=>{this.deleteCart(cart.id)}}/>
                                </td>
                            </tr>
                        )
                    }
                }
            })
        })
    }

    render () {
        if(this.props.user.username === '' && this.props.admin.username === ''){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                        </div>
                        <div className="col-4 text-center align-self-center">
                        <a href='/'>
                        <h2 style={{color:'#58FF33'}}>RUMAHKU HIJAU</h2>
                        </a>
                        </div>
                        <div className="col-4">
                    <Navbar light expand="md">
                        <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/product">Products</NavLink>
                                </NavItem>
                                <a href='/login'>
                                <button className = "btn btn-primary" >
                                    Login
                                </button>
                                </a>
                                <a href='/register'>
                                <button className = "btn btn-success" href="/register">
                                    Register
                                </button>
                                </a>
                                </Nav>
                            </Collapse>
                    </Navbar>
                    </div>
                </div>
                </div>
            )
        } else if (this.props.user.username !== '' && this.props.admin.username === '') {
        // Render setelah login
            return (
                <div className='container'>
                    <div className="row">
                            <div className="col-4">
                            </div>
                            <div className="col-4 text-center align-self-center">
                            <a href='/'>
                            <h2 style={{color:'#58FF33'}}>RUMAHKU HIJAU</h2>
                            </a>
                            </div>
                            <div className="col-4">
                    <Navbar color="light" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem className='align-self-center'>
                            <NavLink href="/product">Products</NavLink>
                        </NavItem>
                        <NavItem className='text-center align-self-center'>
                        <Button color="success" onClick={this.toggleModal}>
                            <i class="fa fa-shopping-cart"></i> <b style={{color:'white'}}>Cart</b>
                            {/* <span class="badge badge-light m-1">{this.state.badge}</span> */}
                        </Button>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Welcome, {this.props.user.username}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                            <Link to='/profile' >Profile</Link>
                            </DropdownItem>
                            <DropdownItem>
                            <Link to={'/OrderHistory/' + this.props.user.id} >Order History</Link>
                            </DropdownItem>
                            <DropdownItem divider />
                            <Link to='/login' >
                            <Button className="dropdown-item" onClick={this.logoutUser}>
                            Logout
                            </Button>
                            </Link>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                    </Navbar>
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}></ModalHeader>
                    <h1 className="display-4 text-center"><b>C A R T</b></h1>
                    <ModalBody>
                        <div>
                            <table className="table table-hover mb-5">
                                <thead>
                                    <tr>
                                        <th >NAMA PRODUCT</th>
                                        <th >QTY</th>
                                        <th >PRICE</th>
                                        <th >TOTAL HARGA</th>
                                        <th >ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderList()}
                                </tbody>
                            </table>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <Link to={'/checkout/'+this.props.user.id} onClick={this.toggleModal}>
                    <Button color="primary" >Pembayaran</Button>{' '}
                    </Link>
                    </ModalFooter>
                </Modal>
                </div>
            );
        } else if (this.props.user.username === '' && this.props.admin.username !== '') {
            return (
                <div className='container'>
                    <div className="row">
                            <div className="col-4">
                            </div>
                            <div className="col-4 text-center align-self-center">
                            <a href='/'>
                            <h2 style={{color:'black'}}> A D M I N </h2>
                            </a>
                            </div>
                            <div className="col-4">
                    <Navbar color="light" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Welcome, {this.props.admin.username}
                        </DropdownToggle>
                        <DropdownMenu right>
                        <DropdownItem>
                            <Link to='/admin' >Dashboard Admin</Link>
                            </DropdownItem>
                            <DropdownItem divider />
                            <Link to='/login' >
                            <Button className="dropdown-item" onClick={this.logoutAdmin}>
                            Logout
                            </Button>
                            </Link>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                    </Navbar>
                    </div>
                </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth,
        admin : state.admin
    }
}

export default connect(mapStateToProps,{onLogoutUser,onLogoutAdmin})(Header)