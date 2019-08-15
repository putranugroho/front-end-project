import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
// import axios from 'axios'
// import {connect} from 'react-redux'


class ProductItem extends Component {

    render () {
        var {product_name,price,src} = this.props.items
            return (
                // <div class="container">
                        <div className='card-body'>
                            {/* <img className='card-img-top' src={src} alt=""/> */}
                            <div className='card-body'>
                                <h5 className='card-title'>{product_name}</h5>
                                <p className='card-text'>Rp. {price}</p>
                                <input className="form-control" ref={input => {this.qty = input}} type="text" defaultValue='0'/>
                                <button className='btn btn-outline-primary btn-block'>Detail</button>
                                <button className='btn btn-primary btn-block' >Add To Cart</button>
                            </div>
                    </div>
                // </div>
            )

    }
}

export default ProductItem