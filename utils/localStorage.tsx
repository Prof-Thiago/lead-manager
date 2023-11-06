export const getFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        const localStore = localStorage.getItem(key)

        if (localStore) {
            try {
                return JSON.parse(localStore ? localStore : "")
            } catch(e) {
                return "";
            }        
        }

        return null;        
    }
}

export const saveInLocalStorage = (key: string, value: any) => {
    if (typeof window !== "undefined") {
        const valueJson = JSON.stringify(value);

        localStorage.setItem(key, valueJson);
    }
}