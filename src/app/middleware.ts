import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseReqResClient } from "@/lib/supabase/server-client";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createSupabaseReqResClient(request, response);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //if no session, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session) {
    //if not an admin and on a page that contains admin in the url, redirect to home
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uid", session.user.id);

    if (data.length > 0) {
      const isAdmin = data[0].admin;


      if (!isAdmin && request.url.includes("admin")) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }
  return response;
}

export const config = {
  matcher: ["/", "/admin"],
};
