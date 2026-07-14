import { useState, useEffect } from "react";
import { MdCheck, MdCreditCard, MdDownload } from "react-icons/md";
import StatusBadge from "../../../components/common/StatusBadge";
import "./BillingSettings.css";

const PLANS = {
  free: {
    id: "free",
    name: "Basic (Free)",
    priceMonthly: 0,
    priceYearly: 0,
    desc: "Essential features for personal reminder management.",
    features: [
      { name: "Up to 10 active reminders", enabled: true },
      { name: "Standard Email alerts", enabled: true },
      { name: "Basic dashboard analytics", enabled: true },
      { name: "SMS alerts", enabled: false },
      { name: "Recurring templates", enabled: false },
      { name: "Automated daily backups", enabled: false },
    ],
  },
  pro: {
    id: "pro",
    name: "Pro Plan",
    priceMonthly: 19,
    priceYearly: 15,
    desc: "Power features for individuals and small teams.",
    features: [
      { name: "Unlimited active reminders", enabled: true },
      { name: "SMS & Email alerts", enabled: true },
      { name: "Full dashboard analytics", enabled: true },
      { name: "Recurring templates & logs", enabled: true },
      { name: "Automated daily backups", enabled: true },
      { name: "Priority email support", enabled: true },
    ],
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 49,
    priceYearly: 39,
    desc: "Advanced controls and collaboration for business usage.",
    features: [
      { name: "Everything in Pro plan", enabled: true },
      { name: "Custom SMS sender branding", enabled: true },
      { name: "Unlimited team members", enabled: true },
      { name: "Dedicated success manager", enabled: true },
      { name: "99.9% SLA uptime guarantee", enabled: true },
      { name: "Custom API & Webhook integrations", enabled: true },
    ],
  },
};

const INVOICES_DATA = [
  { id: "INV-2026-003", date: "14 Jul 2026", amount: "$19.00", status: "Paid" },
  { id: "INV-2026-002", date: "14 Jun 2026", amount: "$19.00", status: "Paid" },
  { id: "INV-2026-001", date: "14 May 2026", amount: "$19.00", status: "Paid" },
];

export default function BillingSettings() {
  // Load persistent subscription details
  const [activePlan, setActivePlan] = useState(() => {
    return localStorage.getItem("active_subscription_plan") || "pro";
  });
  const [billingInterval, setBillingInterval] = useState(() => {
    return localStorage.getItem("active_subscription_interval") || "monthly";
  });

  const [isYearly, setIsYearly] = useState(billingInterval === "yearly");

  // Payment Card info
  const [cardInfo, setCardInfo] = useState(() => {
    const saved = localStorage.getItem("billing_card_info");
    return saved ? JSON.parse(saved) : { number: "**** **** **** 4242", expiry: "12/28", cvc: "***" };
  });

  const [editingCard, setEditingCard] = useState(false);
  const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvc: "" });
  const [cardError, setCardError] = useState("");
  const [cardSaved, setCardSaved] = useState(false);
  const [updatePlanMsg, setUpdatePlanMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("active_subscription_plan", activePlan);
  }, [activePlan]);

  useEffect(() => {
    const interval = isYearly ? "yearly" : "monthly";
    setBillingInterval(interval);
    localStorage.setItem("active_subscription_interval", interval);
  }, [isYearly]);

  const handleUpgrade = (planId) => {
    setActivePlan(planId);
    setUpdatePlanMsg(`Successfully switched to ${PLANS[planId].name}!`);
    setTimeout(() => setUpdatePlanMsg(""), 3500);

    // Trigger custom event to notify other components (e.g. Profile)
    window.dispatchEvent(new Event("subscription_updated"));
  };

  const handleUpdateCard = (e) => {
    e.preventDefault();
    setCardError("");

    if (!cardForm.number || cardForm.number.replace(/\s+/g, "").length < 16) {
      setCardError("Please enter a valid 16-digit card number.");
      return;
    }
    if (!cardForm.expiry || !/^\d{2}\/\d{2}$/.test(cardForm.expiry)) {
      setCardError("Please enter expiry date in MM/YY format.");
      return;
    }
    if (!cardForm.cvc || cardForm.cvc.length < 3) {
      setCardError("Please enter a valid CVC.");
      return;
    }

    const maskedNum = `**** **** **** ${cardForm.number.slice(-4)}`;
    const updated = { number: maskedNum, expiry: cardForm.expiry, cvc: "***" };
    setCardInfo(updated);
    localStorage.setItem("billing_card_info", JSON.stringify(updated));
    setEditingCard(false);
    setCardSaved(true);
    setCardForm({ number: "", expiry: "", cvc: "" });
    setTimeout(() => setCardSaved(false), 2500);
  };

  const handleDownloadInvoice = (invoiceId, date, amount) => {
    const planName = PLANS[activePlan].name;
    const intervalName = isYearly ? "Yearly Billing" : "Monthly Billing";
    const content = `==================================================
                  INVOICE ${invoiceId}
==================================================
Date:         ${date}
Customer:     Admin User
Billing:      ${intervalName}
Plan:         ${planName}
Amount:       ${amount}
Status:       PAID (Thank You!)
==================================================
Reminder App Inc., 100 Cobalt Way, Suite 400
support@reminder.com | https://reminder.com
==================================================`;
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${invoiceId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const currentPlanDetails = PLANS[activePlan];
  const price = isYearly ? currentPlanDetails.priceYearly : currentPlanDetails.priceMonthly;

  return (
    <div className="billing-container">
      {/* Head */}
      <div className="settings-section-head">
        <div>
          <h2 className="settings-section-title">Billing & Subscription</h2>
          <p className="settings-section-desc">Manage your subscription, plan tiers, and billing settings</p>
        </div>
        <span className="settings-section-badge">💳 Billing</span>
      </div>

      {/* Plan Notifications */}
      {updatePlanMsg && (
        <div className="settings-toggle-row" style={{ borderColor: "var(--green)", background: "rgba(47, 158, 104, 0.05)", cursor: "default" }}>
          <div className="settings-toggle-info">
            <span className="settings-toggle-icon" style={{ background: "rgba(47, 158, 104, 0.12)", color: "var(--green)" }}>✓</span>
            <div className="settings-toggle-text">
              <span className="settings-toggle-label">{updatePlanMsg}</span>
              <span className="settings-toggle-desc">Your subscription has been updated successfully.</span>
            </div>
          </div>
        </div>
      )}

      {/* Active Plan Overview */}
      <div className="billing-summary-card">
        <div className="billing-summary-info">
          <span className="billing-summary-title">Current Active Subscription</span>
          <div className="billing-summary-plan">
            <span className="billing-summary-name">{currentPlanDetails.name}</span>
            <StatusBadge status={activePlan === "free" ? "Free" : "Premium"} />
          </div>
          <p className="billing-summary-desc">
            {activePlan === "free" 
              ? "Upgrade to Pro or Enterprise for premium capabilities." 
              : `Renews at $${price}/${isYearly ? "year" : "month"} on 14 Aug 2026 via Card ${cardInfo.number.slice(-4)}`
            }
          </p>
        </div>
      </div>

      {/* Pricing Interval Selector */}
      <div className="billing-cycle-selector">
        <button 
          className={`billing-cycle-btn ${!isYearly ? "active" : ""}`}
          onClick={() => setIsYearly(false)}
        >
          Monthly Billing
        </button>
        <button 
          className={`billing-cycle-btn ${isYearly ? "active" : ""}`}
          onClick={() => setIsYearly(true)}
        >
          Yearly Billing
          <span className="billing-discount-badge">Save 20%</span>
        </button>
      </div>

      {/* Pricing Cards Grid */}
      <div className="pricing-grid">
        {Object.values(PLANS).map((plan) => {
          const isCurrent = activePlan === plan.id;
          const planPrice = isYearly ? plan.priceYearly : plan.priceMonthly;
          
          return (
            <div key={plan.id} className={`pricing-card ${plan.id === "pro" ? "popular" : ""}`}>
              {plan.id === "pro" && <span className="popular-ribbon">Popular</span>}
              
              <div className="pricing-card-header">
                <h3 className="pricing-plan-name">{plan.name}</h3>
                <div className="pricing-plan-price-wrap">
                  <span className="pricing-plan-price">${planPrice}</span>
                  <span className="pricing-plan-period">/{isYearly ? "mo, billed yearly" : "mo"}</span>
                </div>
                <p className="pricing-plan-desc">{plan.desc}</p>
              </div>

              <ul className="pricing-features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`pricing-feature-item ${!feature.enabled ? "disabled" : ""}`}>
                    <span className={`pricing-feature-icon ${!feature.enabled ? "disabled" : ""}`}>
                      <MdCheck size={16} />
                    </span>
                    {feature.name}
                  </li>
                ))}
              </ul>

              <button 
                className={`pricing-btn ${plan.id === "pro" || plan.id === "enterprise" ? "primary" : ""}`}
                disabled={isCurrent}
                onClick={() => handleUpgrade(plan.id)}
              >
                {isCurrent ? "Active Plan" : (plan.priceMonthly === 0 ? "Downgrade" : "Upgrade Plan")}
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment Details section */}
      <div className="billing-section-card">
        <h3 className="billing-section-title">Payment Method</h3>
        {cardSaved && (
          <div style={{ color: "var(--green)", fontSize: "13px", fontWeight: "600", marginBottom: "12px" }}>
            ✓ Card details updated successfully
          </div>
        )}
        <div className="payment-method-box">
          <div className="payment-method-details">
            <div className="card-icon-wrap">
              <MdCreditCard size={20} />
            </div>
            <div className="payment-card-info">
              <span className="payment-card-number">{cardInfo.number}</span>
              <span className="payment-card-expiry">Expires {cardInfo.expiry}</span>
            </div>
          </div>
          <button 
            className="btn-secondary"
            onClick={() => setEditingCard(!editingCard)}
          >
            {editingCard ? "Cancel" : "Update Card"}
          </button>
        </div>

        {editingCard && (
          <form onSubmit={handleUpdateCard} className="card-edit-form">
            {cardError && (
              <div style={{ color: "var(--coral)", fontSize: "12.5px", fontWeight: "600" }}>
                {cardError}
              </div>
            )}
            <div className="form-row">
              <div className="settings-field">
                <label className="settings-label">Card Number</label>
                <input
                  type="text"
                  maxLength={19}
                  className="settings-input"
                  placeholder="4111 2222 3333 4444"
                  value={cardForm.number}
                  onChange={(e) => setCardForm({ ...cardForm, number: e.target.value.replace(/[^\d]/g, "").replace(/(.{4})/g, "$1 ").trim() })}
                  required
                />
              </div>
              <div className="settings-field">
                <label className="settings-label">Expiry (MM/YY)</label>
                <input
                  type="text"
                  maxLength={5}
                  placeholder="12/28"
                  className="settings-input"
                  value={cardForm.expiry}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^\d]/g, "");
                    if (val.length > 2) {
                      val = val.slice(0, 2) + "/" + val.slice(2, 4);
                    }
                    setCardForm({ ...cardForm, expiry: val });
                  }}
                  required
                />
              </div>
              <div className="settings-field">
                <label className="settings-label">CVC</label>
                <input
                  type="password"
                  maxLength={3}
                  placeholder="123"
                  className="settings-input"
                  value={cardForm.cvc}
                  onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value.replace(/[^\d]/g, "") })}
                  required
                />
              </div>
            </div>
            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setEditingCard(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="pricing-btn primary"
                style={{ width: "auto", padding: "8px 20px" }}
              >
                Save Card
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Invoice Table Section */}
      <div className="billing-section-card">
        <h3 className="billing-section-title">Billing History</h3>
        <p className="settings-section-desc" style={{ marginBottom: "12px" }}>Download invoices from your previous billing periods</p>
        
        <div className="invoice-table-wrapper">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Plan Name</th>
                <th>Amount Paid</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {INVOICES_DATA.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: "600", fontFamily: "var(--font-mono)" }}>{inv.id}</td>
                  <td>{inv.date}</td>
                  <td>{PLANS[activePlan].name}</td>
                  <td style={{ fontWeight: "600" }}>{activePlan === "free" ? "$0.00" : inv.amount}</td>
                  <td>
                    <StatusBadge status={inv.status} />
                  </td>
                  <td>
                    <button 
                      className="download-invoice-btn"
                      onClick={() => handleDownloadInvoice(inv.id, inv.date, activePlan === "free" ? "$0.00" : inv.amount)}
                    >
                      <MdDownload size={15} />
                      Download Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
