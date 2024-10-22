import React, { Component } from 'react'
import axios from 'axios'
// import InfiniteCarousel from 'react-leaf-carousel';
import ProductSlider from './ProductSlider'
import ProductItem from './ProductItem'

class Product extends Component {
  state = {
    products : [],
    search_pro : [],
    category : [],
    search_cat : [],
    categorysort : 0,
    filter:false
  }

  componentDidMount(){
    this.getProduct()
    this.getCategory()
  }

  getProduct = () => {
    axios.get('http://localhost:2019/products')
      .then(res => {
        this.setState({products: res.data, search_pro : res.data, edit : 0, input : 0, upload : 0})
        })
  }

  getCategory = () => {
    axios.get('http://localhost:2019/category')
      .then(res => {
        this.setState({category: res.data, search_cat : res.data, edit : 0})
      })
  }

  onBtnSearch = () => {
    const name = this.nama.value
    const category = this.category.value
    const max = parseInt(this.max.value) 
    const min = parseInt(this.min.value)
    
    var proSearch = this.state.search_pro.filter (item => {
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
                item.price <= max && item.price >= min
            )
        }
    })

    var catSearch = this.state.search_cat.filter (item => {
        if(category){
            return(
                item.category_name.toLowerCase().includes(category.toLowerCase())
            )
        }
    })

    if (catSearch[0]) {
        this.setState({category: catSearch, filter: true})
    }
    if (proSearch[0]) {
        this.setState({products: proSearch, filter: true})
    }
  }

  resetFilter = () => {
    return(
        this.setState({products:this.state.search_pro, category:this.state.search_cat, filter:false})
    )
  }

  renderCategory = () => {
    return this.state.products.map(item => { // hasil map = item{id,name,desc,price,src}
      return this.state.category.map(catMap => {
        if(item.category_id === catMap.id){
          if(item.category_id === this.state.categorysort)  
            {
              return (
                <ProductItem items={item}/>
              )
            }

          // if(urutan > length)
          if(this.state.categorysort === 0){
            return (
              <ProductItem items={item}/>
            )
          }
        }
      })
    })
  }

  renderProduct = () => {
    return this.state.products.map(item => { // hasil map = item{id,name,desc,price,src}
        return (
            <ProductSlider item={item}/>
        )
    })
  }

  filter=()=>{
    if (this.state.filter) {
      return(<img className='ml-2' style={{width: 35, height: 35}} alt='' src='https://image.flaticon.com/icons/svg/291/291202.svg' onClick={this.resetFilter} />
      )
    }
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
          <div class="col-lg-4 text-center" onClick={()=>this.setState({categorysort:0, products: this.state.search_pro})}>
              <img class="rounded-circle" src="https://images.unsplash.com/photo-1543364195-bfe6e4932397?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80" alt="Generic placeholder" width="140" height="140"/>
              <h2 className="mt-2">All Product</h2>
            </div>
            <div class="col-lg-4 text-center" onClick={()=>this.setState({categorysort:3})}>
              <img class="rounded-circle" src="https://images.unsplash.com/photo-1563169372-eb64c121f9dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=361&q=80" alt="Generic placeholder" width="140" height="140"/>
              <h2 className="mt-2">Buah</h2>
            </div>
            <div class="col-lg-4 text-center" onClick={()=>this.setState({categorysort:2})}>
              <img class="rounded-circle" src="https://images.unsplash.com/photo-1559317996-d154e05c76fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80" alt="Generic placeholder" width="140" height="140"/>
              <h2 className="mt-2">Sayuran</h2>
            </div>
          </div>
          <hr></hr>
            <div class="input-group mb-10">
              <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Nama Product</span>
              </div>
              <input type="text" class="form-control" ref={input => {this.nama = input}} placeholder="Nama product disini" aria-describedby="basic-addon1"/>
              <div class="input-group-prepend">
                  <span class="input-group-text ml-2" id="basic-addon1">Category</span>
              </div>
              <input type="text" class="form-control" ref={input => {this.category = input}} placeholder="Category product disini" aria-describedby="basic-addon1"/>
              <div class="input-group-prepend">
                  <span class="input-group-text ml-2" id="basic-addon1">Harga</span>
              </div>
              <input type="text" class="form-control" ref={input => {this.min = input}} placeholder="Masukan harga minimal product" aria-describedby="basic-addon1"/>
              <input type="text" class="form-control" ref={input => {this.max = input}} placeholder="Masukan harga maximal product" aria-describedby="basic-addon1"/>
              <button className='btn btn-success ml-2' onClick={()=>this.onBtnSearch()}>Search</button>
              {this.filter()}
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