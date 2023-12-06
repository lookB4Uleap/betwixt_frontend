
import ItemCard from "@/components/ItemCard";
import { SlidingCartContext } from "@/context/SlidingCartContext";
import Main from "./_components/Main";
// import { useState } from "react";

export default function Home() {
    // const [open, setOpen] = useState<boolean>(false);

    return (
        // <main className="flex min-h-screen flex-col bg-slate-300 dark:bg-gray-950">
        //     <ResponsiveAppBar />
        // </main>
        // <SlidingCartContext.Provider value={{
        //     open: open,
        //     onClose: (close: boolean) => setOpen(!close)
        // }}>
        <>
        <Main />
        <div className="min-w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center lg:flex-row lg:flex-wrap lg:justify-start lg:pl-12">
        {/* // <div className="inline-block"> */}
            {/* <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard /> */}
        </div>
        </div>
        </>
        // </SlidingCartContext.Provider>
    );
}
