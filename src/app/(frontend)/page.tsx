'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faEye, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'

const haversineDistance = (
  coords1: { lat: number; lng: number },
  coords2: { lat: number; lng: number },
): number => {
  const toRad = (value: number): number => (value * Math.PI) / 180
  const R = 6371 // Earth radius in km
  const dLat = toRad(coords2.lat - coords1.lat)
  const dLon = toRad(coords2.lng - coords1.lng)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coords1.lat)) *
      Math.cos(toRad(coords2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function Page() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearestBranch, setNearestBranch] = useState<any>(null)
  const [menu, setMenu] = useState<any>([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })

        const branches = await axios.get('http://localhost:3000/api/branches')

        let nearest = null
        let minDistance = Infinity
       
        branches.data.docs.forEach((branch: any) => {
          const distance = haversineDistance(
            { lat: latitude, lng: longitude },
            { lat: branch.location[1], lng: branch.location[0] },
          )

          if (distance <= branch.radius && distance < minDistance) {
            nearest = branch
            minDistance = distance
          }
        })

        setNearestBranch(nearest)
        console.log('nearest='+nearest.name);
        

        if (nearest) {
          const menu = await axios.get(`/api?branch=${nearest.id}`)
          console.log(menu.data);
          setMenu(menu.data.docs[0].items)
        }
      },
      (err) => console.error(err),
    )
  }, [])

  useEffect(() => {}, [menu])

  /* const handleOrder = (items: any[], paymentMethod: string) => {
    const message = `Order Details:\nBranch: ${nearestBranch.name}\nItems: ${items.map((item) => `${item.name} x${item.quantity}`).join(', ')}\nPayment Method: ${paymentMethod}`
    window.location.href = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
  } */

  if (!userLocation) return <p>Getting your location...</p>

  return (
    <div>
      {/* {nearestBranch ? (
        <div>
          <h1>{nearestBranch.name} Menu</h1>
          <h1>
            {userLocation.lat},{userLocation.lng}
          </h1>
          <ul>
            {menu.map((item: any) => (
              <li key={item.name}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>No branches found within your area.</p>
          <h1>
            {userLocation.lat},{userLocation.lng}
          </h1>
        </div>
      )} */}
      <div className="slider-list owl-carousel">
        <div className="slider-area d-flex align-items-center">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="slider-content">
                  <div className="slider-content-title">
                    <h1>
                      <span>New</span> BURGERS
                    </h1>
                    <h1>BEST FAST FOOD</h1>
                  </div>
                  <div className="slider-content-discription">
                    <p>
                      We pride ourselves on sourcing incredible ingredients from ranchers, farmers,
                      bakers, and food purveyors who all share our values.
                    </p>
                  </div>

                  <div className="slider-content-btn">
                    <a href="#">Our Menu</a>
                  </div>
                  <div className="slider-title">
                    <h1>FOOD</h1>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="slider-thumb">
                  <img src="assets/images/hero-img.png" alt="#" />
                  <div className="slider-shape-1 bounce-animate">
                    <img src="assets/images/banner-shape-1.png" alt="#" />
                  </div>
                  <div className="slider-shape-2">
                    <img src="assets/images/banner-shaope-2.png" alt="#" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* products */}
      <div className="shope-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-header">
                <div className="produc-result-counter">
                  <p>Showing 1–12 of 16 results</p>
                </div>
                <div className="form">
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
            {menu.map((item: any) => (
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
                      <a href="shope details.html">
                        <h3>{item.name}</h3>
                      </a>
                    </div>
                    <div className="product-price">
                      <span>${item.price}</span>
                      <del>$99.99</del>
                    </div>
                    <div className="product-icon">
                      <ul>
                        <li>
                          <a href="#">
                            <i>
                              <FontAwesomeIcon icon={faEye} style={{ color: 'white' }} />
                            </i>
                          </a>
                        </li>
                        <li className="active">
                          <a href="#">
                            <i>
                              <FontAwesomeIcon icon={faCartShopping} style={{ color: 'white' }} />
                            </i>
                          </a>
                        </li>
                        <li>
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
          <div className="row ">
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
