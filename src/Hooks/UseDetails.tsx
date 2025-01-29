import React from 'react'
import { useRecoilState, SetterOrUpdater } from 'recoil'
import { tokenAtom, UserAtom } from '../State/UserState'
import { IAdmin } from '../Types/Admin';

interface IReturnType {
    token: string;
    user: IAdmin;
    setToken: SetterOrUpdater<string>;
    setUser: SetterOrUpdater<IAdmin>;
}

export default function UseDetails(): IReturnType {
    const [user, setUser] = useRecoilState(UserAtom);
    const [token, setToken] = useRecoilState(tokenAtom);

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') as string);
        const token = localStorage.getItem('token');

        if (user === undefined || token === undefined) {
            alert('please Login');
            return;
        }

        // setUser(user);
        // setToken(token as string);

    })

    return {
        user,
        token,
        setUser,
        setToken,
    }
}
