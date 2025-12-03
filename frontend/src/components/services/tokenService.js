const KEY = 'authToken';
export const tokenService = {
    set(token) {
        localStorage.setItem(KEY, token);
    },
    get() {
        return localStorage.getItem(KEY);
    },
    remove() {
        localStorage.removeItem(KEY);
    },
    isValid() {
        return Boolean(this.get());
    }
}
