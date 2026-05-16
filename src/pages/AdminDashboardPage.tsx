import { type ReactNode, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import {
  getBookings,
  getClasses,
  getDashboardStats,
  getPayments,
  getSubscriptions,
  updateBookingStatus,
  updateClassStatus,
  updatePaymentStatus,
  updateSubscriptionStatus,
} from "../lib/storage";
import type {
  Booking,
  ClassSession,
  DashboardStats,
  Payment,
  Subscription,
} from "../types";
import { isAdminAuthenticated, setAdminAuthenticated } from "./AdminLoginPage";

type Panel = "overview" | "bookings" | "classes" | "subscriptions" | "payments";

const panelTitles: Record<Panel, string> = {
  overview: "Dashboard Overview",
  bookings: "Bookings",
  classes: "Scheduled Classes",
  subscriptions: "Subscriptions",
  payments: "Payments",
};

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [panel, setPanel] = useState<Panel>("overview");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const refresh = useCallback(() => {
    setStats(getDashboardStats());
    setBookings(getBookings());
    setClasses(getClasses());
    setSubscriptions(getSubscriptions());
    setPayments(getPayments());
  }, []);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
      return;
    }
    refresh();
  }, [navigate, refresh]);

  function logout() {
    setAdminAuthenticated(false);
    navigate("/admin/login");
  }

  if (!isAdminAuthenticated()) return null;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link to="/" className="logo">
          <span className="logo-icon">🔥</span> Phoenix
        </Link>
        <ul className="admin-nav">
          {(
            [
              ["overview", "📊 Overview"],
              ["bookings", "📅 Bookings"],
              ["classes", "🎓 Classes"],
              ["subscriptions", "⭐ Subscriptions"],
              ["payments", "💳 Payments"],
            ] as const
          ).map(([id, label]) => (
            <li key={id}>
              <a
                href="#"
                className={panel === id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setPanel(id);
                }}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button type="button" onClick={logout}>
              🚪 Logout
            </button>
          </li>
        </ul>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h1>{panelTitles[panel]}</h1>
          <Link to="/" className="btn btn-outline btn-sm">
            View website
          </Link>
        </div>

        {panel === "overview" && stats && (
          <section className="panel active">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="label">Total bookings</div>
                <div className="value">{stats.totalBookings}</div>
              </div>
              <div className="stat-card">
                <div className="label">Pending bookings</div>
                <div className="value">{stats.pendingBookings}</div>
              </div>
              <div className="stat-card">
                <div className="label">Active subscriptions</div>
                <div className="value">{stats.activeSubscriptions}</div>
              </div>
              <div className="stat-card">
                <div className="label">Total revenue</div>
                <div className="value">${stats.totalRevenue.toLocaleString()}</div>
              </div>
              <div className="stat-card">
                <div className="label">Upcoming classes</div>
                <div className="value">{stats.upcomingClasses}</div>
              </div>
            </div>
            <p style={{ color: "var(--muted)" }}>
              Welcome back. Use the sidebar to manage bookings, scheduled classes,
              subscriptions, and payments. Data is stored locally in your browser for this
              demo.
            </p>
          </section>
        )}

        {panel === "bookings" && (
          <section className="panel active">
            <TableWrap>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Level</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <EmptyRow colSpan={8} />
                  ) : (
                    bookings.map((b) => (
                      <tr key={b.id}>
                        <td>{b.id}</td>
                        <td>
                          {b.student_name}
                          <br />
                          <small style={{ color: "var(--muted)" }}>{b.email}</small>
                        </td>
                        <td>{b.subject}</td>
                        <td>{b.level}</td>
                        <td>{b.preferred_date}</td>
                        <td>{b.preferred_time}</td>
                        <td>
                          <StatusBadge status={b.status} />
                        </td>
                        <td>
                          <select
                            value={b.status}
                            onChange={(e) => {
                              updateBookingStatus(b.id, e.target.value as Booking["status"]);
                              refresh();
                            }}
                          >
                            <option value="pending">pending</option>
                            <option value="confirmed">confirmed</option>
                            <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </TableWrap>
          </section>
        )}

        {panel === "classes" && (
          <section className="panel active">
            <TableWrap>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Scheduled</th>
                    <th>Platform</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.length === 0 ? (
                    <EmptyRow colSpan={7} />
                  ) : (
                    classes.map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.student_name}</td>
                        <td>{c.subject}</td>
                        <td>{new Date(c.scheduled_at).toLocaleString()}</td>
                        <td>{c.platform}</td>
                        <td>
                          <StatusBadge status={c.status} />
                        </td>
                        <td>
                          <select
                            value={c.status}
                            onChange={(e) => {
                              updateClassStatus(c.id, e.target.value as ClassSession["status"]);
                              refresh();
                            }}
                          >
                            <option value="scheduled">scheduled</option>
                            <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </TableWrap>
          </section>
        )}

        {panel === "subscriptions" && (
          <section className="panel active">
            <TableWrap>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Next billing</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.length === 0 ? (
                    <EmptyRow colSpan={7} />
                  ) : (
                    subscriptions.map((s) => (
                      <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>
                          {s.student_name}
                          <br />
                          <small style={{ color: "var(--muted)" }}>{s.email}</small>
                        </td>
                        <td>{s.plan}</td>
                        <td>${s.amount}</td>
                        <td>
                          <StatusBadge status={s.status} />
                        </td>
                        <td>{s.next_billing_date}</td>
                        <td>
                          <select
                            value={s.status}
                            onChange={(e) => {
                              updateSubscriptionStatus(
                                s.id,
                                e.target.value as Subscription["status"]
                              );
                              refresh();
                            }}
                          >
                            <option value="active">active</option>
                            <option value="cancelled">cancelled</option>
                            <option value="expired">expired</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </TableWrap>
          </section>
        )}

        {panel === "payments" && (
          <section className="panel active">
            <TableWrap>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <EmptyRow colSpan={7} />
                  ) : (
                    payments.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.student_name}</td>
                        <td>{p.type}</td>
                        <td>${p.amount}</td>
                        <td>{p.description}</td>
                        <td>
                          <StatusBadge status={p.status} />
                        </td>
                        <td>
                          <select
                            value={p.status}
                            onChange={(e) => {
                              updatePaymentStatus(p.id, e.target.value as Payment["status"]);
                              refresh();
                            }}
                          >
                            <option value="pending">pending</option>
                            <option value="paid">paid</option>
                            <option value="failed">failed</option>
                            <option value="refunded">refunded</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </TableWrap>
          </section>
        )}
      </main>
    </div>
  );
}

function TableWrap({ children }: { children: ReactNode }) {
  return <div className="data-table-wrap">{children}</div>;
}

function EmptyRow({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} style={{ textAlign: "center", color: "var(--muted)" }}>
        No records yet
      </td>
    </tr>
  );
}
