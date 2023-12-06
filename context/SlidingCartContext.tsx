import { createContext } from "react";

export const SlidingCartContext = createContext({
    open: false,
    onClose: (close: boolean) => {}
});