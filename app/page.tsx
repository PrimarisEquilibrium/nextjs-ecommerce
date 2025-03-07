import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signout } from "./login/actions";

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
            <button formAction={signout}>Sign Out</button>
          </form>
        </div>
      ) : (
        <Link href="/login">Sign Up</Link>
      )}
    </div>
  );
}
