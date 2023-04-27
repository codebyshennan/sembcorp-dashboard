import { SignIn } from '@clerk/nextjs';

const SignInPage = () => (
  <div className="flex justify-center h-screen items-center">
    <SignIn path="/signin" routing="path" signUpUrl="/signup" />
  </div>
);
export default SignInPage;
