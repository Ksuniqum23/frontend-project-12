const KEY = 'authToken'

export const tokenService = {
  set(token) {
    localStorage.setItem(KEY, token)
  },
  get() {
    return localStorage.getItem(KEY)
  },
  remove() {
    localStorage.removeItem(KEY)
  },
  // isValid() {
  //     const currentToken = localStorage.getItem(KEY);
  //     if (!currentToken) return null;
  //
  //     try {
  //         const payloadBase64 = currentToken.split('.')[1];
  //         if (!payloadBase64) return null;
  //
  //         const decodedStr = atob(payloadBase64);
  //         return JSON.parse(decodedStr); // Результат: { userId: 1, iat: 1764853827 }
  //     } catch (error) {
  //         console.error('Failed to decode JWT:', error);
  //         return null;
  //     }
  // },
}
