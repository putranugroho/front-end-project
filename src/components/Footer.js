import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
   render() {
      return (
         <div style={{ backgroundColor: 'black' }} className="mt-5">

            <div style={{backgroundSize: 'cover', backgroundPosition: '50% 75%' }}>
               <div className='container text-white py-5 mt-1 mb-3'>

                  <div className='row'>

                     <div className='col-10 p-0 '>
                        <h6 className='p-0 font-weight-light'>Copyrights 2019 <span className='text-uppercase font-weight-bold text-success'>Rumahku Hijau</span></h6>
                        <h6 className='p-0 my-0 font-weight-light'>Design and developed by <span className='font-weight-normal'>Putra Nugroho</span></h6>
                        <h6 className='p-0 font-weight-light'>For Purwadhika JC-09 Final Project</h6>
                     </div>

                     <div className='col p-0 text-right'>
                        <h6 className='p-0 font-weight-light mb-2 text-uppercase'>Social Media</h6>
                        <div className='row justify-content-end mt-3'>
                           <div className='col-3 p-0'>
                              <a href="https://www.facebook.com/kidsnextgeneration"><img src="https://i.ibb.co/Lh6tZrv/facebook-1.png" alt="facebook-1" /></a>
                           </div>
                           <div className='col-6 text-center p-0'>
                              <a href='https://github.com/putranugroho'><img src="https://i.ibb.co/JQ0K1g8/github-1.png" alt="github-1" /></a>
                           </div>
                           <div className='col-3 text-left p-0'>
                              <a href='mailto:putraa.nugroho@gmail.com'><img src="https://i.ibb.co/bHgWh4v/google-plus-1.png" alt="google-plus-1" /></a>
                           </div>
                        </div>

                        <div className='row mt-3'>
                           <div className='col-3 p-0'>
                              <a href="https://www.instagram.com/whoisputra"><img src="https://i.ibb.co/dQt6wyd/instagram-1.png" alt="instagram-1" /></a>
                           </div>
                           <div className='col-6 text-center p-0'>
                              <a href='#'><img src="https://i.ibb.co/WHttwB0/linkedin-1.png" alt="linkedin-1" /></a>
                           </div>
                           <div className='col- text-left p-0'>
                              <a href='https://wa.me/6281291273949'><img src="https://i.ibb.co/WDhYjVH/whatsapp-1.png" alt="whatsapp-1" /></a>
                           </div>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
   }
}

export default Footer