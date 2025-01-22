'use client'
import { useParams } from 'next/navigation'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Page = () => {
  const params = useParams()
  const id = params.slug
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <div className="container pt-5">
      <div className="row justify-content-center gap-5">
        <div className="col-lg-5 col-md-6">
          <div className="tab style-two" style={{ width: '100%' }}>
            <div className="tab_content" style={{ width: '100%', marginTop: '0' }}>
              <div className="tabs_item" style={{ padding: '0' }}>
                <div className="tabs-items-thumb">
                  <img
                    src={item.image.url}
                    alt=""
                    style={{ width: '100%', borderRadius: '13px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-6">
          <div className="product-about">
            <div className="product-title style-two">
              <h2>{item.name}</h2>
            </div>
            <div className="product-rate style-two">
              <span>${item.price}</span>
              {item.offerPrice ? <del>${item.offerPrice}</del> : null}
            </div>
            <div className="product-discription style-two">
              <p>{item.description}</p>
            </div>
            <div className="product-action style-two">
              <input
                type="number"
                id="quantity"
                min="1"
                max="10"
                placeholder="1"
                style={{ textAlign: 'center' }}
              />
              <button>ADD TO CART</button>
            </div>
            <div className="product-meta style-two">
              <span>Category: {item.type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
