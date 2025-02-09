'use client'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faBars, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const Header = () => {
  const [location, setLocation] = useState()
  const [count, setCount] = useState(0)
  const cartCount = useSelector((state: RootState) => state.cart.cartItems)
  const [isOpen, setIsopen] = useState(false)

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

  useEffect(() => {
    setCount(cartCount.length)
  }, [cartCount])
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button className="md:hidden" onClick={() => setIsopen(!isOpen)}>
              <FontAwesomeIcon
                icon={faBars}
                className="h-8 w-8 text-orange-500"
              />
            </button>
            <Link href="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold text-gray-900">FoodOrder</span>
            </Link>
          </div>

          <div className="flex items-center">
            <Link
              href="/items"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Menu
            </Link>
            <Link href="/cart" className="ml-4 relative p-2 rounded-full hover:bg-gray-100">
              <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-500 rounded-full">
                {count}
              </span>
            </Link>
            <div className="ms-3.5 overflow-hidden hidden md:block md:max-w-72 whitespace-nowrap overflow-ellipsis">
              <FontAwesomeIcon icon={faLocationPin} className="me-2" />
              {location || 'loading location....'}
            </div>
          </div>
        </div>

        {/* mobile navigation */}
        <div
          className={`md:hidden h-full bg-white fixed w-64 left-0 p-4 ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faLocationPin} className="me-2" />
            <span className="block">{location || 'loading location....'}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
