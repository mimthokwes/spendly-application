import React, { createContext, useContext, useEffect, useState } from "react";
import { ENV } from "../env";
import { getToken } from "./authStore";


interface Allocation {
    name: string;
    percent:number;
}
interface User {
  _id?: string;
  username: string;
  email: string;
  allocation: Allocation[];
}

interface UsersContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  updateUser: (updatedData: Partial<User>) => Promise<void>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch user data dari API
  const fetchUser = async () => {
    try {
      setLoading(true);
      const token = getToken();

      const res = await fetch(`${ENV.API_URL}/users/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user data");

      const data = await res.json();
      setUser(data.data || null);
      setError(null);
    } catch (err: any) {
      console.error("Fetch user failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update user data ke backend dan context
  const updateUser = async (updatedData: Partial<User>) => {
    try {
      setLoading(true);
      const token = getToken();

      const res = await fetch(`${ENV.API_URL}/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({data: updatedData}),
      });

      if (!res.ok) throw new Error("Failed to update user");

      const data = await res.json();

      // Update state lokal dengan data terbaru
      setUser((prev) => ({
        ...((prev as User) || {}),
        ...data.data,
      }));

      setError(null);
    } catch (err: any) {
      console.error("Update user failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user ketika pertama kali context di-mount
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        user,
        loading,
        error,
        fetchUser,
        updateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers harus digunakan di dalam UsersProvider");
  }
  return context;
};
