'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faEye, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setBranch, setItems } from '@/redux/slices/branchSlice'
import { Menu } from '@/payload-types'

// Haversine distance function to calculate distance between two points
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

// Define the Branch and MenuItem types for type safety
type Branch = {
  id: string
  name: string
  location: [number, number]
  radius: number
}

type MenuItem = {
  id: string
  name: string
  image: {
    url: string
    altText: string
  }
  type: string
  price: number
  offerPrice:number
  description: string
}

export default function Page() {
  const dispatch = useDispatch()
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearestBranch, setNearestBranch] = useState<Branch | null>(null)
  const [menu, setMenu] = useState<MenuItem[]>([])

  // Fetch user location and nearest branch on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        //get user location
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })

          //fetch branches from api
          const { data } = await axios.get<{ docs: Branch[] }>('http://localhost:3000/api/branches')

          let nearest: Branch | null = null
          let minDistance = Infinity

          //find the nearest branch
          data.docs.forEach((branch) => {
            const distance = haversineDistance(
              { lat: latitude, lng: longitude },
              { lat: branch.location[1], lng: branch.location[0] },
            )

            if (distance <= branch.radius && distance < minDistance) {
              nearest = branch;
              minDistance = distance;
            }
          })

          setNearestBranch(nearest)

          if (nearest) {
            // Dispatch the nearest branch to the Redux store
            dispatch(setBranch(nearest))

            //fetch the menu for the nearest branch
            const menuResponse = await axios.get<{ docs: MenuItem[] }>(`/api?branch=${nearest.id}`)

            console.log(menuResponse)
            setMenu(menuResponse.data.docs)
            //Dispatch the menu items to the Redux store
            dispatch(setItems(menuResponse.data.docs))
          } else {
            setMenu([])
          }
        })
      } catch (error) {
        console.error('error fetching data', error)
      }
    }

    fetchData()
  }, [dispatch])

  if (!userLocation) return <p>Getting your location...</p>
  if (!menu.length) return <p>Loading menu...</p>

  return (
    <div>
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
                        <li className="active">
                          <a href="#">
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
