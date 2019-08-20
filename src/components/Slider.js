import React, { Component } from 'react'
import InfiniteCarousel from 'react-leaf-carousel';

const items = [
    {
      src: 'https://images.unsplash.com/photo-1444041217995-27e2cd75e414?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1467&q=80',
      altText: 'Slide 1',
      caption: 'dimas anjing'
    },
    {
      src: 'https://images.unsplash.com/photo-1475738198235-4b30fc20cff4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1487&q=80',
      altText: 'Slide 2',
      caption: 'deni anjing'
    },
    {
      src: 'https://images.unsplash.com/photo-1531062563406-03bb0697bd4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80',
      altText: 'Slide 3',
      caption: 'bene anjing'
    },
    {
      src: 'https://images.unsplash.com/photo-1475738198235-4b30fc20cff4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1487&q=80',
      altText: 'Slide 4',
      caption: 'subur anjing'
    }
  ];

class Slider extends Component {
    renderList = () => {
        return items.map(item => { // hasil map = item{id,name,desc,price,src}
            return (
                <img style={{width: 2000,height: 500}} src={item.src} alt={item.altText} />
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