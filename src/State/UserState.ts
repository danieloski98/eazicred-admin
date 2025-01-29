import { atom } from 'recoil'
import { IAdmin } from '../Types/Admin'

export const UserAtom = atom({
    key: 'user',
    default: {} as IAdmin,
})

export const tokenAtom = atom({
    key: 'token',
    default: ''
})
