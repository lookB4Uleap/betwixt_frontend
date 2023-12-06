"use client";

import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import SlidingCart from "@/components/SlidingCart";
import { SlidingCartContext } from "@/context/SlidingCartContext";
import React, { useState } from "react";

const Main = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <SlidingCartContext.Provider
            value={{
                open: open,
                onClose: (close: boolean) => setOpen(!close),
            }}
        >
            <ResponsiveAppBar />
            <SlidingCart />
        </SlidingCartContext.Provider>
    );
};

export default Main;
