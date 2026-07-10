import PageHeader from "../../../components/common/PageHeader";

import Greeting from "../components/Greeting";
import Stats from "../components/Stats";
import DashboardGrid from "../components/Layout/DashboardGrid";
import RecentActivity from "../components/RecentActivity";
import DashboardOverview from "../components/DashboardOverview";

export default function Dashboard() {

  return (

    <>

      <PageHeader
        title="Dashboard"
        subtitle="Monitor application activity and access management controls."
        buttonText="Export"
        buttonVariant="primary"
      />

      <Greeting />

      <Stats />

      <DashboardGrid

        left={
          <>
            <RecentActivity />
          </>
        }

        right={
          <>
            <DashboardOverview />
          </>
        }

      />

    </>

  )

}
