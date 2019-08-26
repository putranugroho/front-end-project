import React, { Component } from 'react'
import axios from 'axios'

class DetailProduct extends Component {
    state = {
        products : {}
    }
    
    componentDidMount(){
        let pro_id = this.props.match.params.product_id

        axios.get('http://localhost:2019/products/' + pro_id)
        .then(res => {
            this.setState({products: res.data})
            console.log(res.data);
        })
    }
    
    render() {
        var {product_name, price, detail, image} = this.state.products
            return (
                <div className='card-body col-3 m-5'>       
                    <img className='list' alt='' style={{width: 150, height: 150}} src={`http://localhost:2019/products/avatar/${image}`}/>
                    <div className='card-body'>
                        <h5 className='card-title'>{product_name}</h5>
                        <p className='card-text'>{detail}</p>
                        <p className='card-text'>Rp. {price}</p>
                        <button className='btn btn-outline-primary btn-block'>Detail</button>
                        <button className='btn btn-primary btn-block'>Add To Cart</button>
                    </div>
                </div>
            )
    }
}

export default DetailProduct