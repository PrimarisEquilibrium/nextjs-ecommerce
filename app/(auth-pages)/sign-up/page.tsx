import { signUpAction } from "../actions";

export default function SignUp() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={signUpAction}>Sign up</button>
    </form>
  );
}
