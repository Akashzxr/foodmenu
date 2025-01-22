'use client'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  
  faLocationDot,

  faMagnifyingGlass,

  faShoppingBag,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const Header = () => {
  const [location, setLocation] = useState()
  const [count,setCount] = useState(0);
  const cartCount = useSelector((state: RootState) => state.cart.cartItems);

  //function for finding location name
  const findLocation = async (lat: number, long: number) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`,
      )
      const data = response.data
      console.log(response)
      return data.display_name
    } catch (err) {
      console.error('Error fetching location:', err)
      return null
    }
  }

  useEffect(() => {
    const getuserLocation = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        console.log(latitude + ',' + longitude)

        const locationname = await findLocation(latitude, longitude)
        setLocation(locationname)
      })
    }

    getuserLocation()
  }, [])

  useEffect(()=>{
    setCount(cartCount.length);
  },[cartCount])
  return (
    <div>
      {/*   <!--==================================================-->
<!-- Start dreamhub Header Menu Area -->
<!--==================================================--> */}

      <div className="header-area" id="sticky-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="header-logo">
                <a href="index.html">
                  <img src="/assets/images/logo.png" alt="#" />
                </a>
              </div>
            </div>
            <div className="col-md-9 text-right d-flex align-items-center">
              <div className="header-menu">
                <ul className="nav_scroll d-flex">
                  <li>
                    <Link href={'/'}>HOME</Link>
                  </li>

                  <li>
                    <Link href="/items">MENU</Link>
                  </li>

                  <li>
                    <a href="#">ABOUT</a>
                  </li>

                  <li>
                    <a href="#">CONTACT</a>
                  </li>

                  <li>
                    <Link href={'/branches'}>BRANCHES</Link>
                  </li>
                </ul>
              </div>
              <div className="header-social-menu">
                <ul className="d-flex gap-3 d-flex align-items-center">
                  <li>
                    <span className="search-box-btn search-box-outer">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{ fontSize: '20px', color: 'white' }}
                      />
                    </span>
                  </li>
                  <li>
                    <Link className="handbag" href="/cart" style={{ textDecoration: 'none' }}>
                      <div className="cart-count">{count}</div>
                      <FontAwesomeIcon
                        icon={faShoppingBag}
                        style={{ fontSize: '20px', color: 'white' }}
                      />
                    </Link>
                  </li>
                  <li>
                    <a href="team-details.html">
                      <FontAwesomeIcon icon={faUser} style={{ fontSize: '20px', color: 'white' }} />
                    </a>
                  </li>
                  <li style={{ color: 'white' }} className="d-flex align-items-center">
                    <div>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        style={{ fontSize: '20px', color: 'white', marginRight: '5px' }}
                      />
                    </div>
                    {location || 'loading location....'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Dreamhub Mobile Menu Area --> */}
      <div className="mobile-menu-area sticky d-sm-block d-md-block d-lg-none ">
        <div className="mobile-menu">
          <nav className="dreamhub_menu">
            <ul className="nav_scroll">
              <li>
                <a className="active" href="index.html">
                  HOME
                </a>
              </li>
              <li className="new">
                <a href="#">
                  SHOP <i className="fas fa-plus"></i>
                </a>
                <div className="sub-menu">
                  <ul>
                    <li>
                      <a href="shope.html">Shop</a>
                    </li>
                    <li>
                      <a href="shope details.html">Shop Details</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a href="shope.html">PRODUCT</a>
              </li>
              <li>
                <a href="service.html">SERVICES</a>
              </li>
              <li>
                <a href="#">
                  BLOG <i className="fas fa-plus"></i>
                </a>
                <div className="sub-menu">
                  <ul>
                    <li>
                      <a href="blog.html">Blog</a>
                    </li>
                    <li>
                      <a href="blog-grid.html">Blog Grid</a>
                    </li>
                    <li>
                      <a href="blog-left-sidebar.html">Left sidebar</a>
                    </li>
                    <li>
                      <a href="blog-right-sidebar.html">Right Sidebar</a>
                    </li>
                    <li>
                      <a href="blog-details.html">Blog Details</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a href="#">
                  PAGE <i className="fas fa-plus"></i>
                </a>
                <div className="sub-menu">
                  <ul>
                    <li>
                      <a href="about-us.html">About Us</a>
                    </li>
                    <li>
                      <a href="team.html">Our Team</a>
                    </li>
                    <li>
                      <a href="team-details.html">Team Details</a>
                    </li>
                    <li>
                      <a href="contact-us.html">Contact US</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header
