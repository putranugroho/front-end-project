import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import Axios from 'axios';

import { onLogoutUser } from '../action'

import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

    class Header extends Component {
        constructor(props) {
            super(props);
        
            this.toggle = this.toggle.bind(this);
            this.state = {
              isOpen: false
            };
        }

        toggle() {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }

        // componentDidMount(){
        //     Axios.get('http://localhost:2019/cart').then(res=>this.setState({cart:res.data}))
        // }

        onButtonClick = () => {
            this.props.onLogoutUser()
        }

        // // Menampilkan jumlah product yang berada dalam Cart
        // jumlahCart = () => {
        //     var cart = 0
        //     for (let i = 0; i < this.state.cart.length; i++) {
        //         if(this.props.user.id === this.state.cart[i].idUser){
        //             cart += 1
        //         }
        //     }
        //     return (cart)
        // }
    
        render () {
            if(this.props.user.username === ''){
                // Render ketika belum login
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                            </div>
                            <div className="col-4 text-center align-self-center">
                            <h2>RUMAHKU HIJAU</h2>
                            </div>
                            <div className="col-4">
                        <Navbar light expand="md">
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
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
            } 
    
            // Render setelah login
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">Simple E-Commerce</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem className='mt-2 ml-auto'>
                            <Link to='/' >All Products</Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Welcome, {this.props.user.username}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                            <Link to='/manageProduct' >Manage Product</Link>
                            </DropdownItem>
                            <DropdownItem divider />
                            <Link to='/login' >
                            <Button className="dropdown-item" onClick={this.onButtonClick}>
                            Logout
                            </Button>
                            </Link>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
                
                        
              );
        }
    }
    
    const mapStateToProps = state => {
        return {
            user: state.auth // {id, username}
        }
    }
    
    export default connect(mapStateToProps,{onLogoutUser})(Header)
    // export default Header