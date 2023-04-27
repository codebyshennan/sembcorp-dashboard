import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => (
  <div className="flex justify-center h-screen items-center">
    <SignUp path="/signup" routing="path" signInUrl="/sign-in" />
  </div>
);
export default SignUpPage;
