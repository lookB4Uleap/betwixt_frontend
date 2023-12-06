import Main from "../_components/Main";
import Cart from "./_components/Cart";
import OrderDetails from "./_components/OrderDetails";

export default function Order() {
    return (
        <>
            <Main />
            <div className="flex flex-1">
                <Cart />
                <OrderDetails />
            </div>
        </>
    );
}
