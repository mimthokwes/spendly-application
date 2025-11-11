import React, { createContext, useContext, useEffect, useState } from "react";
import { ENV } from "../env";
import { getToken } from "./authStore";

const SavingsContext = createContext(null as any);

export const SavingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [saving, setSaving] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = getToken();

  // ✅ Get saving user
  const getSaving = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${ENV.API_URL}/savings/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSaving(data); // backend kirim saving langsung
      return data;
    } catch (err: any) {
      setError(err.message);
      setSaving(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create new saving account
  const createSaving = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${ENV.API_URL}/savings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Backend kirim { message, saving } tapi salah format
      // Kita tangani agar tetap aman
      if (data.saving) {
        setSaving(data.saving);
      } else {
        await getSaving(); // ambil ulang data
      }

      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Deposit
  const depositSaving = async (payload: any) => {
    try {
      setLoading(true);
      const res = await fetch(`${ENV.API_URL}/savings/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // backend kirim { message, saving }
      setSaving(data.saving);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Withdraw
  const withdrawSaving = async (payload: any) => {
    try {
      setLoading(true);
      const res = await fetch(`${ENV.API_URL}/savings/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSaving(data.saving);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Saving
  const deleteSaving = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${ENV.API_URL}/savings/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSaving(null);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // otomatis ambil data saat pertama kali render
  useEffect(() => {
    getSaving();
  }, []);

  return (
    <SavingsContext.Provider
      value={{
        saving,
        loading,
        error,
        getSaving,
        createSaving,
        depositSaving,
        withdrawSaving,
        deleteSaving,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
};

// ✅ Hook untuk menggunakan context
export const useSavings = () => {
  const context = useContext(SavingsContext);
  if (!context) {
    throw new Error("useSavings harus digunakan di dalam SavingsProvider");
  }
  return context;
};
