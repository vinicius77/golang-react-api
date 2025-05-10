import { useState, SyntheticEvent } from "react";
import { useContext } from "react";

import { auth } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import useLogout from "../hooks/useLogout";
import { AuthContext } from "../contexts/AuthContext";

type Fields = {
  email: string;
  password: string;
};

const initialState = {
  email: "",
  password: "",
} as Fields;

const SignUpWithEmail: React.FC = () => {
  const { logout } = useLogout();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }
  const { dispatch } = authContext;

  const [fields, setFields] = useState<Fields>(initialState);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const onSubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { email, password } = fields;

    if (!email || !password) {
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!result) {
        throw new Error("Could not complete signup");
      }

      const user = result.user;
      dispatch({ type: "LOGIN", payload: user });

      console.log({ result });

      setFields(initialState);
    } catch (error) {
      throw new Error("Could not complete signup");
    }
  };

  const onGoogleLoginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        const { user = {} } = res;
        console.log({ user, res });
      })
      .catch((error) => console.error({ error }));
  };

  const onGitHubLoginHandler = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        const { user = {} } = res;
        console.log({ user, res });
      })
      .catch((error) => console.error({ error }));
  };

  const onLogout = async () => {
    await logout();
    dispatch({ type: "LOGOUT", payload: null });
  };

  return (
    <section className="login-form">
      <h3>Log into your account</h3>
      <form className="form">
        <div className="form-controls">
          <label htmlFor="email">Email</label>
          <input
            value={fields.email}
            type="email"
            name="email"
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-controls">
          <label htmlFor="password">Password</label>
          <input
            value={fields.password}
            type="password"
            name="password"
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <button onClick={onSubmitHandler}>Login</button>
        </div>
      </form>

      <button type="button" onClick={onGoogleLoginHandler}>
        Login With Google
      </button>

      <button type="button" onClick={onGitHubLoginHandler}>
        Login With Github
      </button>

      <button className="btn" onClick={onLogout}>
        Log Out
      </button>
    </section>
  );
};

export default SignUpWithEmail;

/*import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { GithubLoginButton } from 'react-social-login-buttons'
import firebase from './utils/firebase'
import { API_URL } from './const'
import api from './api'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  or: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },

  github: {
    width: '100% !important',
    margin: '0 !important',
  },

  githubText: {
    fontSize: '14px !important',
    fontWeight: 'bold',
  },
}))

type State = {
  email: string
  password: string
}

const initialState = {
  email: '',
  password: '',
}

type User = {
  id: string
  uuid: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

const SignUp: React.FC = () => {
  const classes = useStyles()
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // user signed in
      } else {
        // user not signed in
      }
    })
  }, [])

  const createUser = useCallback(
    async (params: { email: string | null; uuid: string }) => {
      return await api.post<User>(`${API_URL}/api/users`, params)
    },
    [],
  )

  const setAPIToToken = useCallback(
    async (fb: firebase.auth.UserCredential) => {
      const idToken = await fb.user?.getIdToken()
      if (!idToken) {
        console.warn('[Firebase error]: idToken is not provided')
        return
      }
      api.setToken(idToken)
    },
    [],
  )

  const handleSignUpWithGitHub = useCallback(async () => {
    const provider = new firebase.auth.GithubAuthProvider()

    try {
      const currentUser = await firebase.auth().currentUser

      const res = currentUser
        ? await currentUser.linkWithPopup(provider)
        : await firebase.auth().signInWithPopup(provider)

      await setAPIToToken(res)

      if (!currentUser) {
        const firebaseUser = res.user as firebase.User
        const user = await createUser({
          email: firebaseUser.email,
          uuid: firebaseUser.uid,
        })
        console.log('user: ', user)
      } else {
        // maybe get user through API
      }
    } catch (err) {
      // error handling
      console.error(err)
    }
  }, [createUser, setAPIToToken])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setState(s => ({ ...s, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault()

      const { email, password } = state

      try {
        const res = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)

        await setAPIToToken(res)

        const firebaseUser = res.user as firebase.User
        const user = await createUser({
          email: firebaseUser.email,
          uuid: firebaseUser.uid,
        })
        console.log('user: ', user)
      } catch (e) {
        // error handling
        console.error(e)
      }
    },
    [createUser, setAPIToToken, state],
  )

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={state.email}
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={state.password}
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign Up
          </Button>

          <Grid item xs={12}>
            <div className={classes.or}>or</div>
          </Grid>
        </form>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GithubLoginButton
              className={classes.github}
              onClick={handleSignUpWithGitHub}>
              <span className={classes.githubText}>Sign up with Github</span>
            </GithubLoginButton>
          </Grid>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="#">
            My Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>
  )
}*/
