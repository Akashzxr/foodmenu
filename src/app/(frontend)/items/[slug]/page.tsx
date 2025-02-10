'use client'
import { useParams } from 'next/navigation'
import { faHeart, faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import axios from 'axios'

type Item = {
  id: string
  name: string
  image: {
    url: string
    altText: string
  }
  type: string
  price: number
  quantity:number
  offerPrice: number
  description: string
}

const Page = () => {
  const params = useParams()
  const id = params.slug
  const [item, setItem] = useState<Item>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1)

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/items/${id}`) // Replace with your API route
        console.log(response.data)

        setItem(response.data) // Set the fetched item
      } catch (err) {
        setError('Failed to fetch item')
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!item) return <p>no item detils found</p>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full md:max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2">
              <div className="h-96 md:h-full relative">
                <img
                  src={item.image.url}
                  alt="Truffle Pasta"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-green-600">
                  In Stock
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.name}</h1>
              <p className="text-gray-600 mb-6">
                Hand-crafted pasta tossed in a creamy truffle sauce with wild mushrooms, finished
                with shaved Parmesan and fresh herbs. A perfect blend of earthy and luxurious
                flavors.
              </p>

              {/* Price and Details */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">${item.price}</div>
               
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="mr-4 text-gray-700">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={handleDecrement}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <FontAwesomeIcon icon={faMinus} className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-center w-12">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold
                        flex items-center justify-center space-x-2 hover:bg-green-700 
                        transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                <span>Add to Cart - ${(item.price * quantity).toFixed(2)}</span>
              </button>

              {/* Additional Info */}
              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <span className="w-4 h-4 mr-2">🕒</span>
                  Preparation time: 20-25 minutes
                </p>
                <p className="flex items-center">
                  <span className="w-4 h-4 mr-2">🌶️</span>
                  Spice level: Mild
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
