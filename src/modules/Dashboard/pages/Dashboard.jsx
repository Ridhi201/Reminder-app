import PageHeader from "../../../components/common/PageHeader";

import Greeting from "../components/Greeting";
import Stats from "../components/Stats";
import CategoryChart from "../components/CategoryChart";
import DashboardGrid from "../components/Layout/DashboardGrid";
import QuickActions from "../components/QuickActions";
import TodaysReminders from "../components/TodaysReminders";
import RecentActivity from "../components/RecentActivity";
import UpcomingReminders from "../components/UpcomingReminders";
import CalendarWidget from "../components/CalendarWidget";
import DashboardOverview from "../components/DashboardOverview";

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

      {/* <WeeklyAnalytics /> */}
      <CategoryChart />

      <DashboardGrid

        left={
          <>
            <QuickActions />
            <TodaysReminders />
            <UpcomingReminders />
          </>
        }

        right={
          <>
            <RecentActivity />
            <CalendarWidget />
            <DashboardOverview />
          </>
        }

      />

    </>

  )

}
