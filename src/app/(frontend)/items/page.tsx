'use client'

import { addCartItem } from '@/redux/slices/cartSlice'
import { RootState } from '@/redux/store'
import { faCartShopping, faEye, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

const Page = () => {
  const items = useSelector((state: RootState) => state.branch.items)
  const dispatch = useDispatch()

  if (!items) return <p>Loading Menu</p>

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
       <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Menu</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Menu items will be populated from Supabase */}
        {items.map((item: any) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                src={item.image.url}
                alt={item.image.altText}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <Link href={`/items/${item.id}`}>
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              </Link>
              <p className="text-gray-600 mt-1">Fresh tomatoes, mozzarella, basil</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-orange-500">${item.price}</span>
                <button onClick={()=>dispatch(addCartItem(item))} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
