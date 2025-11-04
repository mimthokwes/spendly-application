// lib/authStore.ts
let token = "";

export const setToken = (value: string) => {
  token = value;
};

export const getToken = () => token;
