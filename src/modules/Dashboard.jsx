import PageHeader from "../../components/common/PageHeader";

import Greeting from "./components/Greeting";
import Stats from "./components/Stats";
import DashboardGrid from "./components/Layout/DashboardGrid";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import UpcomingReminders from "./components/UpcomingReminders";
import CalendarWidget from "./components/CalendarWidget";

export default function Dashboard() {

  return (

    <>

      <PageHeader
        title="Dashboard"
        subtitle="Manage reminders and monitor application activity."
        buttonText="Export"
      />

      <Greeting />

      <Stats />

      <DashboardGrid

        left={
          <>
            <QuickActions />
            <UpcomingReminders />
          </>
        }

        right={
          <>
            <RecentActivity />
            <CalendarWidget />
          </>
        }

      />

    </>

  )

}
