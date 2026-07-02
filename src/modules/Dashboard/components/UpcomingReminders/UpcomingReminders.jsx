import Card from "../../../../components/common/Card";
import Button from "../../../../components/common/Button";
import "./UpcomingReminders.css";

export default function UpcomingReminders() {

    const reminders = [

        {
            id:1,
            title:"Doctor Appointment",
            category:"Health",
            date:"30 Jun",
            time:"10:00 AM",
            priority:"High"
        },

        {
            id:2,
            title:"Team Meeting",
            category:"Work",
            date:"01 Jul",
            time:"02:30 PM",
            priority:"Medium"
        },

        {
            id:3,
            title:"Pay Electricity Bill",
            category:"Personal",
            date:"02 Jul",
            time:"09:00 AM",
            priority:"Low"
        }

    ];

    return (

        <Card>

            <div className="upcoming-header">

                <h2>Upcoming Reminders</h2>

                <Button
                    variant="ghost"
                    size="sm"
                >
                    View All
                </Button>

            </div>

            <div className="upcoming-list">

                {

                    reminders.map(item => (

                        <div
                            className="upcoming-item"
                            key={item.id}
                        >

                            <div className="date-box">

                                <h3>{item.date}</h3>

                                <span>{item.time}</span>

                            </div>

                            <div className="reminder-info">

                                <h4>{item.title}</h4>

                                <p>{item.category}</p>

                            </div>

                            <span
                                className={`priority ${item.priority.toLowerCase()}`}
                            >

                                {item.priority}

                            </span>

                        </div>

                    ))

                }

            </div>

        </Card>

    );

}
