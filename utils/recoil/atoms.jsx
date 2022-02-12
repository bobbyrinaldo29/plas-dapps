import { atom } from "recoil";

export const modal = atom({
  key: "modal",
  default: false,
});

export const modalTx = atom({
  key: "modalTx",
  default: false
})

export const checkDefaultAccount = atom({
  key: "checkDefaultAccount",
  default: "",
});

export const bnbBalance = atom({
  key: "bnbBalance1",
  default: "",
});

export const tokenBalance = atom({
  key: "tokenBalance1",
  default: 0.00,
});
