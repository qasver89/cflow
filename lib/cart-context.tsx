"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  ReactNode,
} from "react";
import { CartLine, MenuItem, Order } from "./types";

const TAX_RATE = 0.08;
const STORAGE_KEY = "ninnes-cart";

interface CartState {
  lines: CartLine[];
  notes: string;
  selectedTable: number | null;
  lastOrder: Order | null;
}

type CartAction =
  | { type: "ADD_ITEM"; item: MenuItem }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "SET_QTY"; id: string; quantity: number }
  | { type: "SET_NOTES"; notes: string }
  | { type: "SET_TABLE"; table: number }
  | { type: "SET_LAST_ORDER"; order: Order }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; state: CartState };

const initialState: CartState = {
  lines: [],
  notes: "",
  selectedTable: null,
  lastOrder: null,
};

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.lines.find((l) => l.item.id === action.item.id);
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            l.item.id === action.item.id
              ? { ...l, quantity: l.quantity + 1 }
              : l
          ),
        };
      }
      return {
        ...state,
        lines: [...state.lines, { item: action.item, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        lines: state.lines.filter((l) => l.item.id !== action.id),
      };
    case "SET_QTY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          lines: state.lines.filter((l) => l.item.id !== action.id),
        };
      }
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.item.id === action.id ? { ...l, quantity: action.quantity } : l
        ),
      };
    }
    case "SET_NOTES":
      return { ...state, notes: action.notes };
    case "SET_TABLE":
      return { ...state, selectedTable: action.table };
    case "SET_LAST_ORDER":
      return { ...state, lastOrder: action.order };
    case "CLEAR_CART":
      return {
        ...state,
        lines: [],
        notes: "",
        selectedTable: null,
      };
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

interface CartContextValue extends CartState {
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  setNotes: (notes: string) => void;
  selectTable: (table: number) => void;
  setLastOrder: (order: Order) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        dispatch({ type: "HYDRATE", state: { ...initialState, ...parsed } });
      }
    } catch {
      // ignore corrupted storage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist on every change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage may be unavailable (private browsing etc.) — fail silently
    }
  }, [state]);

  const subtotal = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.item.price * l.quantity, 0),
    [state.lines]
  );
  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);
  const itemCount = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.quantity, 0),
    [state.lines]
  );

  const value: CartContextValue = {
    ...state,
    addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
    setQuantity: (id, quantity) => dispatch({ type: "SET_QTY", id, quantity }),
    setNotes: (notes) => dispatch({ type: "SET_NOTES", notes }),
    selectTable: (table) => dispatch({ type: "SET_TABLE", table }),
    setLastOrder: (order) => dispatch({ type: "SET_LAST_ORDER", order }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    itemCount,
    subtotal,
    tax,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export { TAX_RATE };
