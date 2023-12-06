"use client"
import { Box, Button, ButtonGroup } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
    const router = useRouter();

    return (
            <ButtonGroup
                variant="outlined"
                aria-label="outlined primary button group"
            >
                <Button 
                    className="border-solid
                        text-xs sm:text-sm lg:text-lg
                        bg-gray-200 dark:bg-transparent 
                        dark:text-gray-100
                        hover:bg-gray-300 dark:hover:bg-gray-800 dark:hover:opacity-90
                        dark:border-gray-400"
                    onClick={() => router.push('/signin')}
                >SIGN IN</Button>
                <Button 
                    className="border-solid 
                        text-xs sm:text-sm lg:text-lg
                        bg-gray-200 dark:bg-transparent 
                        dark:text-gray-100
                        hover:bg-gray-300 dark:hover:bg-gray-800 dark:hover:opacity-90
                        dark:border-gray-400"
                    onClick={() => router.push('/signup')}
                >SIGN UP</Button>
            </ButtonGroup>
    );
};

export default AuthButton;
