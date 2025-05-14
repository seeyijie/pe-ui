'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Fund, User, Subscription } from '../types';
import { users, initialFunds } from '../data/mockData';

interface AppContextType {
  currentUser: User;
  funds: Fund[];
  switchUser: (userId: string) => void;
  createFund: (fund: Omit<Fund, 'id' | 'subscribers' | 'createdBy'>) => void;
  subscribeFund: (fundId: string, amount: number) => void;
  tradeFund: (fundId: string, amount: number) => void;
  users: User[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [funds, setFunds] = useState<Fund[]>(initialFunds);

  const switchUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const createFund = (fundData: Omit<Fund, 'id' | 'subscribers' | 'createdBy'>) => {
    const newFund: Fund = {
      ...fundData,
      id: `fund-${funds.length + 1}`,
      createdBy: currentUser.id,
      subscribers: [],
    };
    setFunds([...funds, newFund]);
  };

  const subscribeFund = (fundId: string, amount: number) => {
    if (currentUser.role === 'Fund Manager') return;

    setFunds(
      funds.map((fund) => {
        if (fund.id === fundId) {
          // Check if user already subscribed
          const existingSubscription = fund.subscribers.find(
            (sub) => sub.investorId === currentUser.id
          );

          if (existingSubscription) {
            // Update existing subscription
            return {
              ...fund,
              subscribers: fund.subscribers.map((sub) =>
                sub.investorId === currentUser.id
                  ? { ...sub, amount: sub.amount + amount }
                  : sub
              ),
            };
          } else {
            // Add new subscription
            const newSubscription: Subscription = {
              investorId: currentUser.id,
              fundId,
              amount,
              date: new Date().toISOString().split('T')[0],
            };
            return {
              ...fund,
              subscribers: [...fund.subscribers, newSubscription],
            };
          }
        }
        return fund;
      })
    );
  };

  const tradeFund = (fundId: string, amount: number) => {
    if (currentUser.role === 'Fund Manager') return;

    if (amount === 0) return;

    setFunds(
      funds.map((fund) => {
        if (fund.id !== fundId) return fund;

        const existing = fund.subscribers.find(
          (sub) => sub.investorId === currentUser.id
        );

        if (existing) {
          const newAmt = existing.amount + amount;
          if (newAmt <= 0) {
            // remove subscription if sold all
            return {
              ...fund,
              subscribers: fund.subscribers.filter(
                (sub) => sub.investorId !== currentUser.id
              ),
            };
          }
          return {
            ...fund,
            subscribers: fund.subscribers.map((sub) =>
              sub.investorId === currentUser.id ? { ...sub, amount: newAmt } : sub
            ),
          };
        }

        // no existing subscription, only add if buying (positive amount)
        if (amount > 0) {
          const newSub: Subscription = {
            investorId: currentUser.id,
            fundId,
            amount,
            date: new Date().toISOString().split('T')[0],
          };
          return { ...fund, subscribers: [...fund.subscribers, newSub] };
        }

        // selling with no holdings, ignore
        return fund;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        funds,
        switchUser,
        createFund,
        subscribeFund,
        tradeFund,
        users,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
} 