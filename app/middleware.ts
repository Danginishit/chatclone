import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { createEdgeRouter } from "next-connect";

const router = createEdgeRouter<NextRequest, NextFetchEvent>();

router.use(async (request, event, next) => {
  // logging request example
  console.log(`${request.method} ${request.url}`);
  return next();
});

router.get("/about", (request) => {
  return NextResponse.redirect(new URL("/about-2", request.url));
});

router.use("/dashboard", (request) => {
  console.log("klflksdlfh")
  return NextResponse.next();
});

router.all(() => {
  // default if none of the above matches
  return NextResponse.next();
});

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  return router.run(request, event);
}
