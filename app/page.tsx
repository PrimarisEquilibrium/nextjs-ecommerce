import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signOutAction } from "./(auth-pages)/actions";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1>Home Page</h1>
      {user ? (
        <div>
          <p>Hello {user.email}</p>
          <form>
            <Link href="/create-product">Create Product</Link>
            <button formAction={signOutAction}>Sign Out</button>
          </form>
        </div>
      ) : (
        <Link href="/sign-up">Sign Up</Link>
      )}
    </div>
  );
}
