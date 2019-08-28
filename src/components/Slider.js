import React, { Component } from 'react'
import InfiniteCarousel from 'react-leaf-carousel';

const items = [
    {
      src: 'https://images.unsplash.com/photo-1462834366666-a6fc4db3fb0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80',
      altText: 'Slide 1',
      caption: 'dimas anjing',
      path: '/product'
    },
    {
      src: 'https://images.unsplash.com/photo-1470087167738-6aa485ff65dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
      altText: 'Slide 2',
      caption: 'deni anjing',
      path: '/profile'
    },
    {
      src: 'https://images.unsplash.com/photo-1433704334812-6c45b0b8784d?ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      altText: 'Slide 3',
      caption: 'bene anjing',
      path: '/admin'
    },
    {
      src: 'https://images.unsplash.com/photo-1559038298-ef4eecdfdbb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
      altText: 'Slide 4',
      caption: 'subur anjing',
      path: '/manageProduct'
    }
  ];

class Slider extends Component {
    renderList = () => {
        return items.map(item => { // hasil map = item{id,name,desc,price,src}
            return (
              <a href={item.path}>
                <img style={{width: 1200,height: 500}} src={item.src} alt={item.altText} />
              </a>
            )
        })
    }

    render () {
        return (
          <InfiniteCarousel
            breakpoints={[
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
            dots={true}
            showSides={true}
            sidesOpacity={.5}
            sideSize={.1}
            slidesToScroll={1}
            slidesToShow={1}
            scrollOnDevice={true}
          >
            
            {this.renderList()}
          
          </InfiniteCarousel>
        )
    }
}

export default Slider