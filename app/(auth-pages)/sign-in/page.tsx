import { signInAction } from "../actions";

export default function SignIn() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={signInAction}>Sign in</button>
    </form>
  );
}
