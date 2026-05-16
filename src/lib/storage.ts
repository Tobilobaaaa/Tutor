import { PLANS } from "../config/plans";
import type {
  Booking,
  BookingFormData,
  ClassSession,
  DashboardStats,
  Payment,
  SubscribeFormData,
  Subscription,
} from "../types";

const KEYS = {
  bookings: "phoenix_bookings",
  subscriptions: "phoenix_subscriptions",
  payments: "phoenix_payments",
  classes: "phoenix_classes",
  nextId: "phoenix_next_id",
} as const;

function load<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function save<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

function nextId(): number {
  const current = Number(localStorage.getItem(KEYS.nextId) || "1");
  localStorage.setItem(KEYS.nextId, String(current + 1));
  return current;
}

function addMonths(date: Date, months: number): string {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split("T")[0] ?? "";
}

export function createBooking(data: BookingFormData): Booking {
  const bookings = load<Booking>(KEYS.bookings);
  const id = nextId();
  const created_at = new Date().toISOString();

  const booking: Booking = {
    id,
    ...data,
    duration_minutes: Number(data.duration_minutes) || 60,
    notes: data.notes ?? "",
    status: "pending",
    created_at,
  };

  bookings.unshift(booking);
  save(KEYS.bookings, bookings);

  const payments = load<Payment>(KEYS.payments);
  payments.unshift({
    id: nextId(),
    student_name: data.student_name,
    email: data.email,
    type: "booking",
    reference_id: id,
    amount: 75,
    status: "pending",
    description: `Single session booking — ${data.subject}`,
    created_at,
  });
  save(KEYS.payments, payments);

  const classes = load<ClassSession>(KEYS.classes);
  classes.unshift({
    id: nextId(),
    booking_id: id,
    student_name: data.student_name,
    subject: data.subject,
    scheduled_at: `${data.preferred_date}T${data.preferred_time}:00`,
    duration_minutes: booking.duration_minutes,
    platform: "Google Meet",
    status: "scheduled",
    notes: data.notes ?? "",
  });
  save(KEYS.classes, classes);

  return booking;
}

export function createSubscription(data: SubscribeFormData): Subscription {
  const planInfo = PLANS[data.plan];
  const today = new Date();
  const start_date = today.toISOString().split("T")[0] ?? "";
  const next_billing_date = addMonths(today, 1);
  const created_at = new Date().toISOString();
  const id = nextId();

  const subscription: Subscription = {
    id,
    student_name: data.student_name,
    email: data.email,
    plan: data.plan,
    amount: planInfo.price,
    status: "active",
    start_date,
    next_billing_date,
    created_at,
  };

  const subs = load<Subscription>(KEYS.subscriptions);
  subs.unshift(subscription);
  save(KEYS.subscriptions, subs);

  const payments = load<Payment>(KEYS.payments);
  payments.unshift({
    id: nextId(),
    student_name: data.student_name,
    email: data.email,
    type: "subscription",
    reference_id: id,
    amount: planInfo.price,
    status: "paid",
    description: `Monthly ${planInfo.name} subscription`,
    created_at,
  });
  save(KEYS.payments, payments);

  return subscription;
}

export function getBookings(): Booking[] {
  return load<Booking>(KEYS.bookings);
}

export function getSubscriptions(): Subscription[] {
  return load<Subscription>(KEYS.subscriptions);
}

export function getPayments(): Payment[] {
  return load<Payment>(KEYS.payments);
}

export function getClasses(): ClassSession[] {
  return load<ClassSession>(KEYS.classes);
}

export function updateBookingStatus(id: number, status: Booking["status"]): void {
  const bookings = load<Booking>(KEYS.bookings);
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx >= 0) {
    bookings[idx] = { ...bookings[idx]!, status };
    save(KEYS.bookings, bookings);
  }
}

export function updateSubscriptionStatus(id: number, status: Subscription["status"]): void {
  const subs = load<Subscription>(KEYS.subscriptions);
  const idx = subs.findIndex((s) => s.id === id);
  if (idx >= 0) {
    subs[idx] = { ...subs[idx]!, status };
    save(KEYS.subscriptions, subs);
  }
}

export function updatePaymentStatus(id: number, status: Payment["status"]): void {
  const payments = load<Payment>(KEYS.payments);
  const idx = payments.findIndex((p) => p.id === id);
  if (idx >= 0) {
    payments[idx] = { ...payments[idx]!, status };
    save(KEYS.payments, payments);
  }
}

export function updateClassStatus(id: number, status: ClassSession["status"]): void {
  const classes = load<ClassSession>(KEYS.classes);
  const idx = classes.findIndex((c) => c.id === id);
  if (idx >= 0) {
    classes[idx] = { ...classes[idx]!, status };
    save(KEYS.classes, classes);
  }
}

export function getDashboardStats(): DashboardStats {
  const bookings = getBookings();
  const subscriptions = getSubscriptions();
  const payments = getPayments();
  const classes = getClasses();
  const now = new Date().toISOString();

  return {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    activeSubscriptions: subscriptions.filter((s) => s.status === "active").length,
    totalRevenue: payments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0),
    upcomingClasses: classes.filter(
      (c) => c.status === "scheduled" && c.scheduled_at >= now
    ).length,
  };
}
