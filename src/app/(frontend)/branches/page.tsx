'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Page = () => {
  const [branches, setBranches] = useState<Branches[]>([])
  const [location, setLocation] = useState<{ [key: string]: string }>({})
  //Define branch type for typesafety
  type Branches = {
    id: string
    name: string
    location: [number, number]
    radius: number
  }

  //function for finding the location
  /* const findLocation = async (lat: number, long: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`,
        {
          headers: {
            'User-Agent': 'MyNextApp', // Required for Nominatim API
          },
        },
      )

      const data = await response.json()
      return data.display_name
    } catch (err) {
      console.error('Error fetching location:', err)
      return null
    }
  } */

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const { data } = await axios.get<{ docs: Branches[] }>(
          'http://localhost:3000/api/branches'
        );
        setBranches(data.docs);

       /*  // Fetch location names for all branches
        const locationPromises = data.docs.map(async (branch) => {
          const locationName = await findLocation(branch.location[1], branch.location[0]);
          return { id: branch.id, locationName };
        });

        const resolvedLocations = await Promise.all(locationPromises);
        const locationMap = resolvedLocations.reduce(
          (acc, curr) => ({ ...acc, [curr.id]: curr.locationName }),
          {}
        ); */

        /* setLocation(locationMap); */
      } catch (err) {
        console.error('Error fetching branches:', err);
      }
    };

    fetchBranches()
  }, [])

  if (!branches.length) return <div>loading......</div>
  return (
    <div className="branch-container">
      <h1 className="title">Our Branches</h1>
      {branches.map((item, index) => (
        <div className="branch-card" key={index}>
          <h2 className="branch-name">{item.name}</h2>
         
        </div>
      ))}
    </div>
  )
}

export default Page
