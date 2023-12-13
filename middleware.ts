import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/","/protected"],
  afterAuth(auth, req){
    //User is authenticated and is on public route should be redirected to Private route
    //if he belongs to any group then to that group else should be forced to create a organization 

    if(auth?.userId && auth.isPublicRoute){
      let path = "/select-org"
      if(auth.orgId){
        path = `/organization/${auth.orgId}`
      }

      const orgSelection = new URL(path, req.url);
      console.log("Org Selection URL : hola 2 ",orgSelection);
      
      return NextResponse.redirect(orgSelection)
    }

    //If user is not authenticated and is a private path..OMG problem problem
    if(!auth.userId && !auth.isPublicRoute){
      // console.log("hdjsoifweufhuiwe")
      // console.log(req.url);
      // console.log(req.nextUrl.origin);
      // we redirect to `req.nextUrl.origin/sign-in`
      
      return redirectToSignIn({returnBackUrl: req.url})
    }

    //If user is authenticated and does not have a org and path is other than select-org
    //this is wrong, the user should select / create an ORG first 
    if(auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org"){
      //we should make them select some org first
      const orgSelection = new URL("/select-org", req.url);
      console.log("Org Selection URL hola : ",orgSelection)
      return NextResponse.redirect(orgSelection)
    }
  }
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 