import { Cart, CartItem } from "@/types/cart";
import { Item } from "@/types/item";
import { useEffect, useState } from "react"

const loadCart = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken)
        return;
    const items: Cart = JSON.parse(localStorage.getItem(`items_${authToken}`) ?? JSON.stringify(null));
    const cartIds = Object.keys(items).filter((id: string) => items[id].quantity > 0);
    let cart: Cart = {};
    cartIds.forEach((id: string) => (cart[id] = items[id]));
    return cart;
}

const saveCart = (item: CartItem) => {
    const authToken = localStorage.getItem("authToken");
    const cartKey = `items_${authToken}`;
    if (!authToken)
        return;
    const cart: Cart = JSON.parse(localStorage.getItem(cartKey) ?? JSON.stringify(null));
    const updatedItem: Cart = {};
    updatedItem[item.item._id] = item;
    const updatedCart = {...cart, ...updatedItem};
    localStorage.setItem(`items_${authToken}`, JSON.stringify(updatedCart));
    return updatedCart;
}

const calTotalAmount = (items?: Cart| null) => {
    let totalAmount = 0;
    if (!items || Object.keys(items).length === 0) 
        return 0;
    Object.keys(items).map(
        (id: string) => {
            totalAmount += items[id].quantity * items[id].item.price;
        }
    );

    // console.log(items, totalAmount);
    return totalAmount;
}

export const useCart = () => {
    const [items, setItems] = useState<Cart|null>();
    let totalAmount = calTotalAmount(items);

    const addToCart = (item?: CartItem| null) => {
        if (!item || Object.keys(item).length === 0)
            return; 
        item.quantity += 1;
        const updatedCart = saveCart(item);
        setItems(() => ({...updatedCart}));
    }

    const removeFromCart = (item?: CartItem| null) => {
        if (!item || Object.keys(item).length === 0)
            return;
        if(item.quantity > 0)
            item.quantity -= 1;
        const updatedCart = saveCart(item);
        setItems(() => ({...updatedCart}));
    }

    useEffect(() => {
        setItems(() => ({...loadCart()}));
        return () => setItems(null);
    }, []);
    
    return {cartItems: {...items}, addToCart, removeFromCart, totalAmount};
}