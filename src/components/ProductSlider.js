import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// import axios from 'axios'
// import {connect} from 'react-redux'


class ProductSlider extends Component {

    render () {
        var {id,product_name,price,image} = this.props.item
            return (
                // <div class="container">
                    <div className='card-body'>
                        <img className='list' alt='' style={{width: 150, height: 150}} src={`http://localhost:2019/products/avatar/${image}`}/>
                        <div className='card-body'>
                            <h5 className='card-title'>{product_name}</h5>
                            <p className='card-text'>Rp. {price}</p>
                            <input className="form-control" ref={input => {this.qty = input}} type="text" defaultValue='0'/>
                            <Link to={'/detailproduct/' + id}>
                            <button className='btn btn-outline-primary btn-block'>Detail</button>
                            </Link>
                            <button className='btn btn-primary btn-block' >Add To Cart</button>
                        </div>
                    </div>
                // </div>
            )

    }
}

export default ProductSlider