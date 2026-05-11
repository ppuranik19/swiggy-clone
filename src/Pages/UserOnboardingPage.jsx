import React, { useState } from "react";
import SignupForm from "../components/UserOnBoardingComponents/SignupForm";
import LoginForm from "../components/UserOnBoardingComponents/LoginForm";

const UserOnboardingPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <React.Fragment>
      <main className="min-h-screen bg-[#f7f7f7] px-5 py-10 sm:px-10">
        <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center">
          {isLogin ? (
            <LoginForm onSwitch={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitch={() => setIsLogin(true)} />
          )}
        </div>
      </main>
    </React.Fragment>
  );
};

export default UserOnboardingPage;
