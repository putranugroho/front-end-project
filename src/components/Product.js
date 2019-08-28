import React, { Component } from 'react'
import axios from 'axios'
import InfiniteCarousel from 'react-leaf-carousel';
import ProductSlider from './ProductSlider'
import ProductItem from './ProductItem'

class Product extends Component {
  state = {
    products : [],
    search_pro : [],
    category : 0
  }

  componentDidMount(){
    this.getProduct()
  }

  getProduct = () => {
    axios.get('http://localhost:2019/products')
      .then(res => 
        this.setState({products: res.data, search_pro: res.data})
      )
  }

  onBtnSearch = () => {
    const name = this.nama.value
    const max = parseInt(this.max.value) 
    const min = parseInt(this.min.value)

    var arrSearch = this.state.search_pro.filter (item => {
        if(isNaN(min) && isNaN(max)){ // Search by Name
            return (
                item.product_name.toLowerCase().includes(name.toLowerCase())
            )
        } else if (isNaN(min)){ // Name and Max
            return (
                item.product_name.toLowerCase().includes(name.toLowerCase())
                &&
                item.price <= max
            )
        } else if (isNaN(max)){ // Name and Max
            return (
                item.product_name.toLowerCase().includes(name.toLowerCase())
                &&
                item.price >= min
            )
        } else if (item.price <= max && item.price >= min){
            return (
                item.product_name.toLowerCase().includes(name.toLowerCase())
                &&
                (item.price <= max && item.price >= min)
            )
        }
    })

    this.setState({products: arrSearch})
  }

  renderCategory = () => {
    return this.state.products.map(item => { // hasil map = item{id,name,desc,price,src}
      const latest = this.state.products.length - 4

      if(item.category_id === this.state.category)  
      {
        return (
          <ProductItem items={item}/>
        )
      }

      if(item.id > latest){
        if(this.state.category === 0){
          return (
            <ProductItem items={item}/>
          )
        }
      }
    })
  }

  renderProduct = () => {
    return this.state.products.map(item => { // hasil map = item{id,name,desc,price,src}
        return (
            <ProductSlider item={item}/>
        )
    })
  }

  renderList = () => {
    return (
      <div className="row">
        {this.renderCategory()}
      </div>
    )
  }

  render () {
    if (this.state.products === null){
      return <h1> L o a d i n g . . . </h1>
    }
      return (
        <div className="container">
          <div class="row mt-5">
          <div class="col-lg-4 text-center" onClick={()=>this.setState({category:0, products: this.state.search_pro})}>
              <img class="rounded-circle" src="https://images.unsplash.com/photo-1543364195-bfe6e4932397?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80" alt="Generic placeholder" width="140" height="140"/>
              <h2 className="mt-2">All Product</h2>
            </div>
            <div class="col-lg-4 text-center" onClick={()=>this.setState({category:1})}>
              <img class="rounded-circle" src="https://images.unsplash.com/photo-1563169372-eb64c121f9dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=361&q=80" alt="Generic placeholder" width="140" height="140"/>
              <h2 className="mt-2">Buah</h2>
            </div>
            <div class="col-lg-4 text-center" onClick={()=>this.setState({category:2})}>
              <img class="rounded-circle" src="https://images.unsplash.com/photo-1559317996-d154e05c76fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80" alt="Generic placeholder" width="140" height="140"/>
              <h2 className="mt-2">Sayuran</h2>
            </div>
          </div>
          <hr></hr>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Nama Product</span>
              </div>
              <input type="text" class="form-control" ref={input => {this.nama = input}} placeholder="Masukan nama product disini" aria-describedby="basic-addon1"/>
              <div class="input-group-prepend">
                <span class="input-group-text ml-2" id="basic-addon1">Harga</span>
              </div>
              <input type="text" class="form-control" ref={input => {this.min = input}} placeholder="Masukan harga minimal product" aria-describedby="basic-addon1"/>
              <input type="text" class="form-control" ref={input => {this.max = input}} placeholder="Masukan harga maximal product" aria-describedby="basic-addon1"/>
              <button className='btn btn-success ml-2' onClick={this.onBtnSearch}>Search</button>
            </div>
          <hr></hr>
          <h1 className='text-center'>Products</h1>
          <br></br>
          {this.renderList()}
        </div>
      )
        
    //   <InfiniteCarousel
    //   breakpoints={[
    //     {
    //       breakpoint: 500,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //       },
    //     },
    //     {
    //       breakpoint: 768,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //       },
    //     },
    //   ]}
    //   dots={true}
    //   showSides={true}
    //   sidesOpacity={.5}
    //   sideSize={.1}
    //   slidesToScroll={1}
    //   slidesToShow={5}
    //   scrollOnDevice={true}
    // >          
    
    //   {this.renderProduct()}
    
    // </InfiniteCarousel>
    
  }
}

export default Product