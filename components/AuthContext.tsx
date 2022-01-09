//type
import { AuthContextProviderProps } from "../interface/AuthContextProvider";
import {
  AuthContext,
  User,
  UserLoginInput,
  UserRegisterInput,
} from "../interface";

//library
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

const AuthContext = createContext<AuthContext>({
  user: null,
  errorMessage: null,
  register: () => new Promise(() => {}),
  login: () => new Promise(() => {}),
  logout: () => new Promise(() => {}),
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}: AuthContextProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: "https://graph-api-test.webby.asia/graphql",
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const client = createApolloClient();

  const register = async (values: UserRegisterInput): Promise<void> => {
    const RegisterMutation = gql`
      mutation Register(
        $user_fullname: String!
        $user_email: String!
        $user_mobile: String!
        $password: String!
      ) {
        register(
          input: {
            user_fullname: $user_fullname
            user_email: $user_email
            user_mobile: $user_mobile
            password: $password
          }
        )
      }
    `;

    try {
      setErrorMessage(null);
      const result = await client.mutate({
        mutation: RegisterMutation,
        variables: {
          user_fullname: values.user_fullname,
          user_email: values.user_email,
          user_mobile: values.user_mobile,
          password: values.password,
        },
      });
      setErrorMessage(result.data.register + " Login Now");

      router.push("/login");
    } catch (err) {
      setErrorMessage("Register Failed, Please try again!");
    }
  };

  const login = async (values: UserLoginInput): Promise<void> => {
    const LoginMutation = gql`
      mutation Login($user_mobile: String!, $password: String!) {
        login(input: { user_mobile: $user_mobile, password: $password }) {
          token
          user {
            user_id
            user_fullname
          }
        }
      }
    `;

    try {
      setErrorMessage(null);
      const result = await client.mutate({
        mutation: LoginMutation,
        variables: {
          user_mobile: values.user_mobile,
          password: values.password,
        },
      });

      setAuthToken(result.data.login.token);
      setUser(result.data.login.user);
      router.push("/");
    } catch (err) {
      setErrorMessage("Login Failed, Please try again!");
    }
  };

  const logout = async (): Promise<void> => {
    const LogoutMutation = gql`
      mutation {
        logout {
          status
          message
        }
      }
    `;

    try {
      const result = await client.mutate({
        mutation: LogoutMutation,
      });

      setErrorMessage(
        result.data.logout.status + ", " + result.data.logout.message
      );
      setAuthToken(null);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const value: AuthContext = {
    user,
    errorMessage,
    register,
    login,
    logout,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
