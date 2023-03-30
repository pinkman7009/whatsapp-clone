import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/common/Buttons";
import { Container } from "../components/common/Container";

const RegisterPage = () => {
  return (
    <Container>
      <div className="h-screen flex items-center justify-center bg-gray-300">
        <div className="w-1/2 p-6 flex flex-col items-center mt-12">
          <div className="bg-white rounded-lg p-6 shadow-2xl h-auto w-1/2 mt-12 flex flex-col items-center justify-between">
            <h1 className="text-primary font-bold text-3xl">Register</h1>
            <input
              name="name"
              type="text"
              className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
              placeholder="Enter name"
              // value={userDetails.email}
              // onChange={onChange}
            />
            <input
              name="email"
              type="email"
              className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
              placeholder="Enter email"
              // value={userDetails.email}
              // onChange={onChange}
            />
            <input
              name="password"
              type="password"
              className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
              placeholder="Password"
              // value={userDetails.password}
              // onChange={onChange}
            />
            <input
              name="confirmpassword"
              type="password"
              className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
              placeholder="Confirm Password"
              // value={userDetails.password}
              // onChange={onChange}
            />

            <PrimaryButton text="Sign Up" size="large" handleClick={() => {}} />
            <p className="text-primary">or</p>
            <Link to="/">
              <p className="text-primary font-bold cursor-pointer transition-all ease-in hover:border-b-2 hover:border-primary">
                Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
