import type { SubscriptionPlan } from "../types";

export const PLANS: Record<
  SubscriptionPlan,
  { name: string; price: number; sessions: number; description: string }
> = {
  essential: {
    name: "Essential",
    price: 149,
    sessions: 4,
    description: "4 live sessions per month · 1 subject",
  },
  standard: {
    name: "Standard",
    price: 279,
    sessions: 8,
    description: "8 live sessions per month · up to 2 subjects",
  },
  premium: {
    name: "Premium",
    price: 449,
    sessions: 12,
    description: "12 live sessions per month · all subjects · priority booking",
  },
};

export const ADMIN_EMAIL = "admin@phoenixacademy.com";
export const ADMIN_PASSWORD = "PhoenixAdmin2026!";
