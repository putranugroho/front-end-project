import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogoutUser, onLogoutAdmin } from '../action'
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
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

    onButtonClick = () => {
        this.props.onLogoutUser()
        this.props.onLogoutAdmin()
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
                        <NavItem>
                            <NavLink href="/product">Products</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Welcome, {this.props.user.username}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                            <Link to='/profile' >Profile</Link>
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
                </div>
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