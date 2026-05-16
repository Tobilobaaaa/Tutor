export type Subject =
  | "mathematics"
  | "further-math"
  | "english"
  | "physics"
  | "chemistry"
  | "biology"
  | "general-science";

export type StudentLevel = "high-school" | "college" | "university";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type SubscriptionPlan = "essential" | "standard" | "premium";

export interface Booking {
  id: number;
  student_name: string;
  email: string;
  phone: string;
  subject: Subject;
  level: StudentLevel;
  preferred_date: string;
  preferred_time: string;
  duration_minutes: number;
  notes: string;
  status: BookingStatus;
  created_at: string;
}

export interface Subscription {
  id: number;
  student_name: string;
  email: string;
  plan: SubscriptionPlan;
  amount: number;
  status: "active" | "cancelled" | "expired";
  start_date: string;
  next_billing_date: string;
  created_at: string;
}

export interface Payment {
  id: number;
  student_name: string;
  email: string;
  type: "booking" | "subscription";
  reference_id: number;
  amount: number;
  status: PaymentStatus;
  description: string;
  created_at: string;
}

export interface ClassSession {
  id: number;
  booking_id: number | null;
  student_name: string;
  subject: Subject;
  scheduled_at: string;
  duration_minutes: number;
  platform: string;
  status: "scheduled" | "completed" | "cancelled";
  notes: string;
}

export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  activeSubscriptions: number;
  totalRevenue: number;
  upcomingClasses: number;
}

export interface BookingFormData {
  student_name: string;
  email: string;
  phone: string;
  subject: Subject;
  level: StudentLevel;
  preferred_date: string;
  preferred_time: string;
  duration_minutes: number;
  notes: string;
}

export interface SubscribeFormData {
  student_name: string;
  email: string;
  plan: SubscriptionPlan;
}
