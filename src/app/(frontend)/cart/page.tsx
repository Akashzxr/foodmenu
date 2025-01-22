'use client'
import { RootState } from '@/redux/store'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
  const items = useSelector((state: RootState) => state.cart.cartItems)
  return (
    <div>
      <h1 style={{ textAlign: 'center', width: '100%' }}>CART</h1>
      {items.map((item: any) => (
        <div key={item.name}>
          <div
            className="product-content text-center"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
          >
            <div className="text-center">
              <img
                src={item.image.url}
                alt={item.image.altText}
                style={{ width: '133px', borderRadius: '20px' }}
              />
            </div>
            {/* product details */}
            <div>
              <a>{item.type}</a>
              <div className="product-title">
                <Link href={`/items/${item.id}`}>
                  <h3>{item.name}</h3>
                </Link>
              </div>
              <div className="product-price">
                <span>${item.price}</span>
                {item.offerPrice ? <del>${item.offerPrice}</del> : null}
              </div>
            </div>

            {/* product count */}
            <div>
                <button>+</button>
                <input type="text" value='1' />
                <button>-</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Page
