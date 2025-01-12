 import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest } from 'next/server';

  export async function GET(request:NextRequest){
    const payload = await getPayload({ config })
    const  branch  = request.nextUrl.searchParams.get("branch");
    const menu = await payload.find({
        collection: 'menus',
        where: {
          branch: {
            equals: branch,
          },
        },
      });
    return Response.json(menu);
  }