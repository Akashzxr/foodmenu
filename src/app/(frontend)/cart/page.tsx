'use client'
import { decrementItem, incrementItem, removeItem } from '@/redux/slices/cartSlice'
import { RootState } from '@/redux/store'
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page = () => {
  const items = useSelector((state: RootState) => state.cart.cartItems)
  const dispatch = useDispatch()
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const onCheckout = (items: any[], totalPrice: number) => {
    const phoneNumber = '+919946478853' // Replace with your business WhatsApp number

    // Generate order details message
    let message = 'Hello, I would like to place an order:\n\n'

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - $${item.price} x ${item.quantity}\n`
    })

    message += `\nTotal Price: $${totalPrice}\n\nPlease confirm my order.`

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)

    // Detect if the user is on a mobile device
    const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent)

    const whatsappUrl = isMobile
      ? `https://wa.me/${phoneNumber}?text=${encodedMessage}` // Mobile WhatsApp
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}` // WhatsApp Web

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Cart Items */}
          {items.map((item: any) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image.url}
                  alt="Pizza"
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600">Fresh tomatoes, mozzarella, basil</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => dispatch(decrementItem(item.id))}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faMinus} className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="text-gray-900 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementItem(item.id))}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faPlus} className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <span className="text-lg font-bold text-orange-500">${item.price}</span>
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="p-1 rounded-full hover:bg-gray-100 text-red-500"
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Empty Cart Message */}
          {false && (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600">Your cart is empty</p>
              <Link
                href="/menu"
                className="mt-4 inline-block px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Browse Menu
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold text-gray-900">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => onCheckout(items, totalPrice)}
              className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
