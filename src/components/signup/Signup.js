import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useStore } from "react-redux";
import { authUser } from "../../redux-files/actions";
import { Container, Button } from 'react-bootstrap';
import TopNav from "../../components/TopNav";

const SignUp = () => {
  //store the state of inputs
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  //use redux store and next router
  const store = useStore();
  const router = useRouter();

  //upon change of each input, store the value
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPassChange = (event) => {
    setPass(event.target.value);
  };

  //upon submission, attempt to post user to server
  const onFormSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:3002/users/signup", {
        email: email,
        password: pass,
      })
      .then((res) => {
        //store token in local storage
        window.localStorage.setItem("token", res.data.token);
        //authenticate user
        store.dispatch(authUser());
        //redirect to profile page
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
    <TopNav/>
    <Container className="text-center">
      <h1 className="font-bold text-3xl text-center ">Sign Up</h1>
      <form className="text-center" onSubmit={onFormSubmit}>
        <input
          className="m-3 p-1"
          required
          type='email'
          placeholder='email'
          onChange={onEmailChange}
        ></input>
        <input
          className="m-3 p-1"
          required
          type='password'
          placeholder='password'
          onChange={onPassChange}
        ></input>
        <Button variant="primary" className="m-3 mx-3 py-2 px-4 rounded">Create Account</Button>
      </form>

      <Link href='/login'>
          <Button variant="outline-primary" type="submit" className=" m-3">Back to login</Button>
        </Link>

    </Container>
    </>
  );
};

export default SignUp;
