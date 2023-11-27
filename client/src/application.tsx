import React from "react";
import { Route, Routes } from "react-router";
import { useEffect, useReducer, useState } from "react";
import routes from "./config/routes";
import { initialUserState, userReducer } from "./contexts/user";
import LoadingComponent from "./components/LoadingComponent";
import AuthRoute from "./components/AuthRoute";
import { Validate } from "./modules/auth";
import logging from "./config/logging";

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [loading, setLoading] = useState<boolean>(true);
  const [authStage, setAuthStage] = useState<string>(
    "Checking localstorage ..."
  );

  useEffect(() => {
    setTimeout(() => {
      CheckLocalStorageForCredentials();
    }, 1000);
    // eslint-disable-next-line
  }, []);

  const CheckLocalStorageForCredentials = () => {
    setAuthStage("Checking credentials ...");

    const fire_token = localStorage.getItem("fire_token");

    if (fire_token === null)
    {
        userDispatch({ type: 'logout', payload: initialUserState });
        setAuthStage('No credentials found');
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }
    else
    {
        return Validate(fire_token, (error, user) => {
            if (error)
            {
                logging.error(error);
                userDispatch({ type: 'logout', payload: initialUserState });
                setLoading(false);
                
            }
            else if (user)
            {
                userDispatch({ type: 'login', payload: { user, fire_token } });
                setLoading(false);
            }
        })
        
      }
    }


  const userContextValues = {
    userState,
    userDispatch,
  };

  if (loading) {
    return <LoadingComponent>{authStage}</LoadingComponent>;
  }

  return (
    <Routes>
      {routes.map((route, index) => {
        const Component = route.component;
        if (route.auth) {
          return (
            <Route key={index} path={route.path} element={<AuthRoute><Component /></AuthRoute>} />
          );
        }

        return <Route key={index} path={route.path} element={<Component />} />;
      })}
    </Routes>
  );
};

export default Application;
