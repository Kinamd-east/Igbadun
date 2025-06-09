import { SignupForm } from "@/components/signup-form";
import Navbar from "@/components/Navbar";

const Signup = () => {
  return (
    <div className="flex flex-col flex-1 gap-6">
      <Navbar />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
