import { Suspense } from "react";
import Main from "../_components/Main";
import MenuContainer from "./_components/MenuContainer";

export default function Home() {
    return (
        // <main className="flex min-h-screen flex-col bg-slate-300 dark:bg-gray-950">
        //     <ResponsiveAppBar />
        // </main>
            <Suspense>
                <Main />
                <MenuContainer />
            </Suspense>
            
        );
}
