import React, { Component } from 'react'
import axios from 'axios'
import InfiniteCarousel from 'react-leaf-carousel';
import ProductItem from './ProductItem'

class ProductSlider extends Component {
  state = {
    products : null
  }

  componentDidMount(){
    this.getProduct()
  }

  getProduct = () => {
    axios.get('http://localhost:2019/products')
      .then(res => 
        this.setState({products: res.data})
      )
  }

  renderList = () => {
    return this.state.products.map(item => { // hasil map = item{id,name,desc,price,src}
        return (
          <div>
            <ProductItem items={item}/>
          </div>
        )
    })
  }

    render () {
      if (this.state.products === null){
        return <h1> L o a d i n g . . . </h1>
      }
        return (
          <div className="container">
            <hr></hr>
            <div className="row justify-content-between">
            <h2 className="col-4">PRODUCTS</h2>
            <a className="col-4 text-right" href="/">See All ></a>
            </div>
          <InfiniteCarousel
            breakpoints={[
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
            ]}
            dots={true}
            showSides={true}
            sidesOpacity={.5}
            sideSize={.1}
            slidesToScroll={1}
            slidesToShow={5}
            scrollOnDevice={true}
          >
            
            {this.renderList()}
          
          </InfiniteCarousel>
        </div>
        )
    }
}

export default ProductSlider