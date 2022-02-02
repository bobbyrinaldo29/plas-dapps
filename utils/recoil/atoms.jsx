import { atom } from "recoil";

export const modal = atom({
    key: 'modal',
    default: false,
})

export const checkDefaultAccount = atom({
    key: 'checkDefaultAccount',
    default: '',
})

export const bnbBalance = atom({
    key: 'bnbBalance',
    default: '',
})

export const tokenBalance = atom({
    key: 'tokenBalance',
    default: '',
})