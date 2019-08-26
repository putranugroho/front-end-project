import React, { Component } from 'react'
import axios from 'axios'
import InfiniteCarousel from 'react-leaf-carousel';
import ProductSlider from './ProductSlider'
import ProductItem from './ProductItem'

class Product extends Component {
  state = {
    products : null,
    category : 0
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

  renderCategory = () => {
    return this.state.products.map(item => { // hasil map = item{id,name,desc,price,src}
      if(item.category_id === this.state.category)  
      {
        return (
          <ProductItem items={item}/>
        )
      }

      if(this.state.category === 0){
        return (
          <ProductItem items={item}/>
        )
      } 
      return console.log("");
      
    })
  }

  renderProduct = () => {
    return this.state.products.map(item => { // hasil map = item{id,name,desc,price,src}
        return (
          <div>
            <ProductSlider items={item}/>
          </div>
        )
    })
  }

  render () {
    if (this.state.products === null){
      return <h1> L o a d i n g . . . </h1>
    }
    if(this.state.category === 0){
      return (
        <div className="container">
          <div class="row mt-5">
            <div class="col-lg-6 text-center" onClick={()=>this.setState({category:1})}>
              <img class="rounded-circle" src="https://images.unsplash.com/photo-1563169372-eb64c121f9dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=361&q=80" alt="Generic placeholder" width="140" height="140"/>
              <h2 className="mt-2">Buah</h2>
            </div>
            <div class="col-lg-6 text-center" onClick={()=>this.setState({category:2})}>
              <img class="rounded-circle" src="https://images.unsplash.com/photo-1559317996-d154e05c76fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80" alt="Generic placeholder" width="140" height="140"/>
              <h2 className="mt-2">Sayuran</h2>
            </div>
        </div>
        <hr></hr>
        <h2 className='text-center'>All Products</h2>
        <br></br>
        <div className="row">
          {this.renderCategory()}
        </div>
      </div>
      )
    } else if(this.state.category === 1){
      return (
        <div className="container">
          <div class="row mt-5">
            <div class="col-lg-6 text-center"  onClick={()=>this.setState({category:1})}>
              <img class="rounded-circle" src="https://images.unsplash.com/photo-1563169372-eb64c121f9dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=361&q=80" alt="Generic placeholder" width="140" height="140"/>
              <h2 className="mt-2">Buah</h2>
            </div>
            <div class="col-lg-6 text-center"  onClick={()=>this.setState({category:2})}>
              <img class="rounded-circle" src="https://images.unsplash.com/photo-1559317996-d154e05c76fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80" alt="Generic placeholder" width="140" height="140"/>
              <h2 className="mt-2">Sayuran</h2>
            </div>
        </div>
          <hr></hr>
          <div className="row justify-content-between">
          <h2 className="col-4">ALL PRODUCTS</h2>
          <a className="col-4 text-right" href="/product">See All ></a>
          </div>
        <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 3,
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
          slidesToShow={4}
          scrollOnDevice={true}
        >
          
          {this.renderProduct()}
        
        </InfiniteCarousel>
        <hr></hr>
        <h2 className='text-center'>B U A H</h2>
        <br></br>
        <div className="row">
          {this.renderCategory()}
        </div>
      </div>
      )
    } else if(this.state.category === 2){
      return (
        <div className="container">
          <div class="row mt-5">
            <div class="col-lg-6 text-center" onClick={()=>this.setState({category:1})}>
              <img class="rounded-circle" src="https://images.unsplash.com/photo-1563169372-eb64c121f9dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=361&q=80" alt="Generic placeholder" width="140" height="140"/>
              <h2 className="mt-2">Buah</h2>
            </div>
            <div class="col-lg-6 text-center" onClick={()=>this.setState({category:2})}>
              <img class="rounded-circle" src="https://images.unsplash.com/photo-1559317996-d154e05c76fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80" alt="Generic placeholder" width="140" height="140"/>
              <h2 className="mt-2">Sayuran</h2>
            </div>
        </div>
          <hr></hr>
          <div className="row justify-content-between">
          <h2 className="col-4">ALL PRODUCTS</h2>
          <a className="col-4 text-right" href="/product">See All ></a>
          </div>
        <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 3,
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
          slidesToShow={4}
          scrollOnDevice={true}
        >
          
          {this.renderProduct()}
        
        </InfiniteCarousel>
        <hr></hr>
        <h2 className='text-center'>S A Y U R A N</h2>
        <br></br>
        <div className="row">
          {this.renderCategory()}
        </div>
      </div>
      )
    }
  }
}

export default Product