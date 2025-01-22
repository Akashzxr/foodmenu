import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest } from 'next/server';

  export async function GET(request:NextRequest){
    const payload = await getPayload({ config })
    const  branch  = request.nextUrl.searchParams.get("branch");
    const items = await payload.find({
        collection: 'items',
        where: {
          'branches.id': {
            equals: branch,
          },
        },
      });
      
    return Response.json(items);
  }