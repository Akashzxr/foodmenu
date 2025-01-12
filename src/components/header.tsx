import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus, faShoppingBag, faUser } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
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
                  <img src="assets/images/logo.png" alt="#" />
                </a>
              </div>
            </div>
            <div className="col-md-9 text-right">
              <div className="header-menu">
                <ul className="nav_scroll">
                  <li>
                    <a className="active" href="index.html">
                      HOME
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      SHOP <FontAwesomeIcon icon={faPlus} style={{fontSize:'12px',}}/>
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
                      BLOG <FontAwesomeIcon icon={faPlus} style={{fontSize:'12px',}}/>
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
                      PAGE <FontAwesomeIcon icon={faPlus} style={{fontSize:'12px',}}/>
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
              </div>
              <div className="header-social-menu">
                <ul className='d-flex gap-3'>
                  <li>
                    <span className="search-box-btn search-box-outer">
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize:'20px',color:'white'}}/>
                    </span>
                  </li>
                  <li>
                    <a className="handbag" href="shope.html">
                    <FontAwesomeIcon icon={faShoppingBag} style={{fontSize:'20px',color:'white'}}/>
                    </a>
                  </li>
                  <li>
                    <a href="team-details.html">
                    <FontAwesomeIcon icon={faUser} style={{fontSize:'20px',color:'white'}}/>
                    </a>
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
              <li className='new'>
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
