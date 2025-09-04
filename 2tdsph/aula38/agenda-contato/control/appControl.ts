import { useState } from "react"

const useAppControl = () => {

    const [token, setToken] = useState<string | null>(null);

    return { token, setToken };

}

export { useAppControl };