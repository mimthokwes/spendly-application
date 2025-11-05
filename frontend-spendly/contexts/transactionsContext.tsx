import React, { createContext, useContext, useEffect, useState } from "react";
import { ENV } from "../env";
import { getToken } from "./authStore";

const TransactionContext = createContext(null as any);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [percentageChange, setPercentageChange] = useState<number | null>(null);


  const fetchTransactions = async (year?: number, month?: number) => {
    try {
      setLoading(true);
      const token = getToken();

      let url = `${ENV.API_URL}/transactions`;
      if (year && month) url += `?year=${year}&month=${month}`;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch transactions");

      const data = await res.json();
      setTransactions(Array.isArray(data.data) ? data.data : []);
    } catch (error: any) {
      console.error("Something Wrong Happened", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: any) => {
    try {
      const token = getToken();
      const res = await fetch(`${ENV.API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: transaction }),
      });
      if (!res.ok) throw new Error("Failed to add transaction");
      const data = await res.json();
      fetchTransactions();
    } catch (error: any) {
      console.error("Something Wrong Happened", error);
      setError(error.message);
    }
  }
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        error,
        fetchTransactions,
        // addTransaction,
        //deleteTransaction,
        percentageChange,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions harus digunakan di dalam TransactionProvider"
    );
  }
  return context;
};
