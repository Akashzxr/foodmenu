'use client'

import { addCartItem } from '@/redux/slices/cartSlice'
import { RootState } from '@/redux/store'
import { faCartShopping, faEye, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

const Page = () => {
  const items = useSelector((state: RootState) => state.branch.items);
  const dispatch = useDispatch();

  if(!items) return <p>Loading Menu</p>

  return (
    <div>
      <div className="shope-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-header">
                <div className="produc-result-counter">
                  <p>MENU</p>
                </div>
                <div className="form" style={{ visibility: 'hidden' }}>
                  <select className="order-by">
                    <option value="text">Default shorting</option>
                    <option value="text">Short by popularity</option>
                    <option value="text">Short by avarage rating</option>
                    <option value="text">Short by latest</option>
                    <option value="text">Short by price: low to high</option>
                    <option value="text">Short by: high to low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {items.map((item: any) => (
              <div key={item.name} className="col-lg-3 col-md-6">
                <div className="shop-product">
                  <div className="product-thumb text-center">
                    <img src={item.image.url} alt={item.image.altText} />
                  </div>
                  <div className="product-content text-center">
                    <a href="shope details.html">{item.type}</a>
                    <div className="product-rating">
                      <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                      <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                      <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                      <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                      <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                      <span>(4.00)</span>
                    </div>
                    <div className="product-title">
                      <Link href={`/items/${item.id}`}>
                        <h3>{item.name}</h3>
                      </Link>
                    </div>
                    <div className="product-price">
                      <span>${item.price}</span>
                      {
                        item.offerPrice ? <del>${item.offerPrice}</del> : null
                      }
                    </div>
                    <div className="product-icon">
                      <ul>
                        <li style={{ visibility: 'hidden' }}>
                          <a href="#">
                            <i>
                              <FontAwesomeIcon icon={faEye} style={{ color: 'white' }} />
                            </i>
                          </a>
                        </li>
                        <li className="active" onClick={()=>dispatch(addCartItem(item))}>
                          <a>
                            <i>
                              <FontAwesomeIcon icon={faCartShopping} style={{ color: 'white' }} />
                            </i>
                          </a>
                        </li>
                        <li style={{ visibility: 'hidden' }}>
                          <a href="#">
                            <i>
                              <FontAwesomeIcon icon={faHeart} style={{ color: 'white' }} />
                            </i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row " style={{ visibility: 'hidden' }}>
            <div className="col-md-12">
              <div className="as-pagination text-center">
                <ul>
                  <li>
                    <a href="shope details.html">1</a>
                  </li>
                  <li>
                    <a href="shope details.html">2</a>
                  </li>
                  <li>
                    <a href="shope details.html">3</a>
                  </li>
                  <li>
                    <a href="shope details.html">
                      <i className="bi bi-arrow-right-short"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
