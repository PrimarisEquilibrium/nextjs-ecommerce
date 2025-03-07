import { forgotPasswordAction } from "../actions";

export default function ForgotPassword() {
  return (
    <div>
      <h1>Forgot Password</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <button formAction={forgotPasswordAction}>Send Email</button>
      </form>
    </div>
  );
}
