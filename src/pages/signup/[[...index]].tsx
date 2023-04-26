import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => (
  <SignUp path="/signup" routing="path" signInUrl="/sign-in" />
);
export default SignUpPage;
