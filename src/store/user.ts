import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Action = {
  updateAddress: (address: string) => void;
};

interface State {
  address: string;
}

export const useUserStore = create<State & Action>()(
  immer((set) => ({
    address: "",

    updateAddress: (address) =>
      set((state) => {
        state.address = address;
      }),
  }))
);
