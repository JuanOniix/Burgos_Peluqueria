"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import type { Product } from "@/data/products";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = { items: CartItem[]; hydrated: boolean };

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QUANTITY"; id: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

const STORAGE_KEY = "burgos-cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items, hydrated: true };
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.product.id,
            name: action.product.name,
            price: action.product.price,
            image: action.product.image,
            quantity: 1,
          },
        ],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QUANTITY":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    hydrated: false,
  });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    let items: CartItem[] = [];
    if (raw) {
      try {
        items = JSON.parse(raw);
      } catch {
        // ignore malformed cart data
      }
    }
    dispatch({ type: "HYDRATE", items });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items, state.hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = state.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    return {
      items: state.items,
      itemCount,
      subtotal,
      addItem: (product) => dispatch({ type: "ADD", product }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      setQuantity: (id, quantity) =>
        dispatch({ type: "SET_QUANTITY", id, quantity }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
