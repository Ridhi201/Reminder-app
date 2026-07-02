import PageHeader from "../../../components/common/PageHeader";

export default function Reminders() {
  return (
    <>
      <PageHeader
        title="Reminders"
        subtitle="Manage user reminders and scheduling items"
      />
      <div style={{ padding: "20px", background: "white", borderRadius: "12px", border: "1px solid var(--border)", marginTop: "20px" }}>
        Reminders page content will go here.
      </div>
    </>
  );
}
