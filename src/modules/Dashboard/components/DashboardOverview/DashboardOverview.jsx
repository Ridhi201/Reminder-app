import Card from "../../../../components/common/Card";
import "./DashboardOverview.css";

const overview = [
    {
        label: "Server Status",
        value: "Online",
        status: "online"
    },
    {
        label: "Mobile Users",
        value: "2,845"
    },
    {
        label: "Active Users",
        value: "1,245"
    },
    {
        label: "Notifications Today",
        value: "158"
    }
];

export default function DashboardOverview(){

    return(

        <Card>

            <div className="overview-header">

                <h2>System Overview</h2>

            </div>

            <div className="overview-grid">

                {

                    overview.map((item,index)=>(

                        <div
                        className="overview-item"
                        key={index}
                        >

                            <div>

                                <h4>{item.label}</h4>

                                <p>{item.value}</p>

                            </div>

                            {

                                item.status==="online"

                                &&

                                <span className="online-dot"></span>

                            }

                        </div>

                    ))

                }

            </div>

        </Card>

    )

}
