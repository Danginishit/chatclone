import { createEdgeRouter } from "next-connect";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import cookie from 'cookie';

const router = createEdgeRouter<NextRequest, NextFetchEvent>();

router.use("/dashboard", (request: NextRequest) => {
    const userIdentity = cookie.parse(request.cookies.get('user')?.value ?? '');
    
    if(!userIdentity?.user){
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
});
router.use("/login", (request: NextRequest) => {
    console.log()
    const userIdentity = cookie.parse(request.cookies.get('user')?.value ?? '');

    if(userIdentity?.user){
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
});


export function middleware(request: NextRequest, event: NextFetchEvent){
    // console.log("fknfkh")
    // return NextResponse.next()
    return router.run(request, event);
}