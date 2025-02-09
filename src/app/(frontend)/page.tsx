'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setBranch, setItems } from '@/redux/slices/branchSlice'

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
  quantity:number
  offerPrice: number
  description: string
}

export default function Page() {
  const dispatch = useDispatch()
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearestBranch, setNearestBranch] = useState<Branch | null>(null)
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [ismenu,setIsmenu] = useState(true);

  // Fetch user location and nearest branch on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        //get user location
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })

          //fetch branches from api
          const { data } = await axios.get<{ docs: Branch[] }>('/api/branches')

          let nearest: Branch | null = null
          let minDistance = Infinity

          //find the nearest branch
          data.docs.forEach((branch) => {
            const distance = haversineDistance(
              { lat: latitude, lng: longitude },
              { lat: branch.location[1], lng: branch.location[0] },
            )

            if (distance <= branch.radius && distance < minDistance) {
              nearest = branch
              minDistance = distance
            }
          })

          console.log("---------nearest---");
          console.log(nearest);
          
          if (nearest) {
            setNearestBranch(nearest)
            // Dispatch the nearest branch to the Redux store
            dispatch(setBranch(nearest))
            console.log(nearest);
            
            //fetch the menu for the nearest branch
            const menuResponse = await axios.get<{ docs: MenuItem[] }>(`/api?branch=${nearest.id}`)
      
            console.log(menuResponse)
            setMenu(menuResponse.data.docs)
            //Dispatch the menu items to the Redux store
            dispatch(setItems(menuResponse.data.docs))
          } else {
            setNearestBranch(null);
            setMenu(null)
          }
        })
      } catch (error) {
        console.error('error fetching data', error)
      }
    }

    fetchData()
  }, [dispatch])

  if (!userLocation) return <p>Getting your location...</p>
  if (!ismenu) return <p>No Menus found on the Nearest Branch</p>
  if (!menu.length)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Menu</h1>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Menu items will be populated from Supabase */}
        {menu.map((item: any) => (
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
                <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
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
