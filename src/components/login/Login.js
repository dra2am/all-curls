import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStore } from "react-redux";
import { authUser } from "../../redux-files/actions/index";
import { Container, Button } from 'react-bootstrap';
import TopNav from "../../components/TopNav";

// import styles from "../styles/Home.module.css";

const Login = () => {
  //redirect user
  const router = useRouter();

  //stores inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //access store
  const store = useStore();

  //get input from username
  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  //get input from password
  const onPassChange = (event) => {
    setPassword(event.target.value);
  };

  //prevent default behavior and contact server
  const onFormSubmit = async (event) => {
    event.preventDefault();

    // make req to server
    await axios
      .post("http://localhost:3002/users/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        //store token in local storage
        window.localStorage.setItem("token", res.data.token);
        //authenticate user
        store.dispatch(authUser());
        //redirect to products page
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //for a faster transition
  useEffect(() => {
    // Prefetch the page as the user will go there after the login
    router.prefetch("/");
  }, []);

  return (
    <>
      <Head>
        <title> Sign in</title>
      </Head>

    <TopNav/>
    <Container>
    <div className="text-center" onSubmit={onFormSubmit}>
      <h1 className="font-bold text-3xl text-center ">Log In</h1>
        <form>
          <input
            className="m-3 p-1"
            type='email'
            required
            placeholder='username or email'
            onChange={onUsernameChange}
          ></input>
          <input
          className="m-3 p-1"
            type='password'
            required
            placeholder='password'
            onChange={onPassChange}
          ></input>
          <Button type="submit" variant="primary">Login</Button>
        </form>

        <div className='create-acc m-3'>
          <p>
            Don't have an account?{" "}<br></br>
            <Link href='/signup'>
              <Button className="m-3" variant="outline-primary">Sign up</Button>
            </Link>
          </p>
        </div>
      </div>
    </Container>
  
    </>
  );
};

export default Login;
