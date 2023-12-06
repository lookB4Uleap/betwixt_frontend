"use client";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "next-themes";
import FirebaseSignInContainer from "./FirebaseSignInContainer";
import { useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    getRedirectResult,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth";
import { auth } from "@/firebase";
import axios from "axios";
import { useAuthState } from 'react-firebase-hooks/auth';
import { ErrorSharp } from "@mui/icons-material";
import { betwixtRedirect, betwixtSignInWithEmail, betwixtSignInWithProvider } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useBetwixtAuth } from '@/hooks/useBetwixtAuth';

export default function SignInContainer() {
    const DARK = "dark";
    const LIGHT = "light";
    const { theme, setTheme } = useTheme();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();
    // const [user, loading, error] = useAuthState(auth);
    const  { user, loading, error }  = useBetwixtAuth();

    // console.log(auth.currentUser);

    const onSignInWithProvider = async (user: any) => {
        if (!user)
            return;

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/users/auth/provider`, {
            name: user?.displayName,
            uid: user?.uid,
            email: user?.email,
            photoUrl: user?.photoURL,
            phone: user?.phoneNumber
        })

        if (!data?.user || Object.keys(data?.user).length === 0)
            return;

        for (const key in data?.user) {
            if (!data?.user[key])
                continue;
            
            localStorage.setItem(key, data?.user[key]);
        }

        localStorage.setItem("loginType", "provider");
        console.log("[SignIn] Google Sign In ", data);
    }

    useEffect(() => {
        // getRedirectResult(auth)
        //     .then(async(result) => {
        //         // This gives you a Google Access Token. You can use it to access Google APIs.
        //         const credential =
        //             result && GoogleAuthProvider.credentialFromResult(result);
        //         const token = credential?.accessToken;

        //         // The signed-in user info.
        //         const user = result?.user;
        //         if (!user || !result)
        //             return;
        //         const res = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/users/auth/provider`, {
        //             name: user?.displayName,
        //             uid: user?.uid,
        //             email: user?.email,
        //             photoUrl: user?.photoURL,
        //             phone: user?.phoneNumber
        //         })
        //         console.log("[SignIn] Google Sign In ", res.data);
        //         // IdP data available using getAdditionalUserInfo(result)
        //         // ...
        //     })
        //     .catch((error) => {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         // const email = error.customData.email;
        //         // The AuthCredential type that was used.
        //         const credential =
        //             GoogleAuthProvider.credentialFromError(error);
        //         // ...
        //     });

        betwixtRedirect(GoogleAuthProvider, (user) => {
            onSignInWithProvider(user);
            router.replace('/menu');
        })

        console.log("[user] ", [user, loading, error]);
    }, [user, router, error, loading]);

    const handleTheme = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        console.log(theme);
        if (theme === DARK) {
            localStorage.setItem("theme", LIGHT);
            setTheme(LIGHT);
            return;
        }
        localStorage.setItem("theme", DARK);
        setTheme(DARK);
    };

    const signInWithEmail = () => betwixtSignInWithEmail({email, password});

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        betwixtSignInWithProvider(provider);

        // signInWithPopup(auth, provider)
        //     .then((result) => {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         const credential =
        //             GoogleAuthProvider.credentialFromResult(result);
        //         const token = credential?.accessToken;
        //         // The signed-in user info.
        //         const user = result.user;
        //         // IdP data available using getAdditionalUserInfo(result)
        //         // ...
        //     })
        //     .catch((error) => {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.customData.email;
        //         // The AuthCredential type that was used.
        //         const credential =
        //             GoogleAuthProvider.credentialFromError(error);
        //         // ...
        //     });
        
    };

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div
                    className="absolute right-0 top-0 m-5"
                    onClick={handleTheme}
                >
                    <LightModeIcon
                        sx={{ fontSize: 30 }}
                        className="
          dark:hidden
          text-cyan-950 dark:text-cyan-50
          hover:text-cyan-900 dark:hover:text-gray-300
          hover:cursor-pointer
          "
                    />
                    <DarkModeIcon
                        sx={{ fontSize: 30 }}
                        className="
          hidden dark:flex
          text-cyan-950 dark:text-cyan-50
          hover:text-cyan-900 dark:hover:text-gray-300
          hover:cursor-pointer
          "
                    />
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    required
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5
                   dark:bg-gray-900 text-gray-900 dark:text-gray-100
                   shadow-sm ring-1 ring-inset 
                   ring-gray-300 dark:ring-gray-800
                  placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset 
                  focus:ring-indigo-600 dark:focus:ring-gray-950
                  sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold 
                  text-indigo-600 hover:text-indigo-500
                  dark:text-cyan-200 dark:hover:text-cyan-400"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="block w-full rounded-md border-0 py-1.5
                  dark:bg-gray-900 text-gray-900 dark:text-gray-100
                  shadow-sm ring-1 ring-inset 
                  ring-gray-300 dark:ring-gray-800
                 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset 
                 focus:ring-indigo-600 dark:focus:ring-gray-950
                 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md 
                bg-indigo-600  px-3 py-1.5 text-sm font-semibold leading-6 
                text-white shadow-sm 
                hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                focus-visible:outline-indigo-600"
                                onSubmit={signInWithEmail}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div>
                        <button
                            className="flex w-full justify-center rounded-md mt-3
                bg-indigo-600  px-3 py-1.5 text-sm font-semibold leading-6 
                text-white shadow-sm 
                hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                focus-visible:outline-indigo-600"
                            onClick={signInWithGoogle}
                        >
                            Sign in with Google
                        </button>
                    </div>

                    {/* <div className="z-10">
                        <FirebaseSignInContainer />
                    </div> */}

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <a
                            href="#"
                            className="font-semibold leading-6 
            text-indigo-600 hover:text-indigo-500
            dark:text-cyan-200 dark:hover:text-cyan-300"
                        >
                            Sign up now!
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
