import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate, useParams } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";
import { useDispatch } from "react-redux";
import { userLogin, userSignUp } from "../store/actions/userActions";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Login = ({ location }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const history = useNavigate();
  const params = useParams();
  const userData = JSON.parse(localStorage.getItem("profile"));
  const [isSignup, setIsSignup] = useState(params.type === "register");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(userSignUp({ form, history, location }));
    } else {
      dispatch(userLogin({ form, history, location }));
    }
  };
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleChange = (e) => {
    console.log(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    if(userData){
      navigate("/")
    }
  },[userData])
  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay ">
          <div
            className="flex flex-col justify-center items-center  p-3 "
            style={{ width: "300px" }}
          >
            <div className="p-5 justify-center">
              <img
                src={logo}
                width="130px"
                alt="logo"
                className="relative left-[calc(50%-65px)]"
              />
            </div>
            <h1 className="text-white text-xl text-semibold">
              {isSignup ? "T???o t??i kho???n" : "????ng nh???p"}
            </h1>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center w-full">
                {isSignup && (
                  <div className="flex justify-between mt-2 ">
                    <input
                      onChange={(e) => handleChange(e)}
                      name="firstName"
                      label="First Name"
                      autoFocus
                      placeholder="H???"
                      className="p-2 rounded-md w-[calc(50%-3px)] border-solid border-2 border-sky-500 outline-none"
                    />
                    <input
                      onChange={(e) => handleChange(e)}
                      name="lastName"
                      label="Last Name"
                      placeholder="T??n"
                      className="p-2 rounded-md w-[calc(50%-3px)] border-solid border-2 border-sky-500 outline-none"
                    />
                  </div>
                )}
                <input
                  onChange={(e) => handleChange(e)}
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Email"
                  className="p-2 rounded-md w-full mt-2 border-solid border-2 border-sky-500 outline-none"
                />
                <input
                  onChange={(e) => handleChange(e)}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="M???t kh???u"
                  className="p-2 rounded-md w-full mt-2 border-solid border-2 border-sky-500 outline-none"
                />
                {isSignup && (
                  <input
                    onChange={(e) => handleChange(e)}
                    name="confirmPassword"
                    label="Repeat Password"
                    type="password"
                    placeholder="X??c nh???n m???t kh???u"
                    className="p-2 rounded-md w-full mt-2 border-solid border-2 border-sky-500 outline-none"
                  />
                )}
              </div>
              <button
                type="submit"
                variant="contained"
                color="primary"
                className="p-2 rounded-md w-full mt-2 bg-sky-400 text-white font-semibold "
              >
                {isSignup ? "????ng k??" : "????ng nh???p"}
              </button>
              {/*<div className=" flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 ">
                <div className="w-full">
                  <GoogleLogin
                    clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                    render={(renderProps) => (
                      <button
                        type="button"
                        className="bg-mainColor flex justify-center items-center p-2 rounded-lg cursor-pointer outline-none w-full mt-2"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <FcGoogle className="mr-4" /> ????ng nh???p v???i Google
                      </button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy="single_host_origin"
                  />
                </div>
                    </div>*/}
              <div>
                <div
                  onClick={switchMode}
                  className="text-white text-semibold text-right mt-2"
                >
                  {isSignup ? (
                    <div>
                      ???? c?? t??i kho???n?{" "}
                      <span className="hover:cursor-pointer hover:text-sky-400">
                        ????ng nh???p
                      </span>
                    </div>
                  ) : (
                    <div>
                      Ch??a c?? t??i kho???n?{" "}
                      <span className="hover:cursor-pointer hover:text-sky-400">
                        ????ng k??
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
