import "./AuthLayout.css";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">

      <div className="auth-left">

        <div className="left-content">

          <h1>Reminder Admin</h1>

          <p>
            Manage reminders, users, templates,
            analytics and notifications from one place.
          </p>

          <img
            src="https://illustrations.popsy.co/blue/digital-nomad.svg"
            alt="illustration"
          />

        </div>

      </div>

      <div className="auth-right">

        {children}

      </div>

    </div>
  );
}
