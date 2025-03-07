import { createClient } from "@/utils/supabase/server";
import { resetPasswordAction } from "../actions";
import { encodedRedirect } from "@/utils/utils";

export default async function ResetPassword() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    encodedRedirect("error", "/sign-in", "Not authenticated");
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <form>
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
        />
        <button formAction={resetPasswordAction}>Reset Password</button>
      </form>
    </div>
  );
}
