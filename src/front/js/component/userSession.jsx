import { useEffect, useState } from "react";

const useUserSession = userKey => {
    const [user, setUser] = useState(
        sessionStorage.getItem(userKey) || null,
        );

    useEffect(() => {
        sessionStorage.setItem(userKey, user);
    }, [user]);

    return [user, setUser];
};
export default useUserSession;
