import Card from "../../../../components/common/Card";
import Button from "../../../../components/common/Button";
import "./CalendarWidget.css";

export default function CalendarWidget() {

    const days = [
        "", "", "", "", "", "",
        1,2,3,4,5,6,
        7,8,9,10,11,12,13,
        14,15,16,17,18,19,20,
        21,22,23,24,25,26,27,
        28,29,30
    ];

    return (

        <Card>

            <div className="calendar-header">

                <h2>Calendar</h2>

                <Button
                    size="sm"
                    variant="ghost"
                >
                    View Full
                </Button>

            </div>

            <h3 className="month">

                June 2026

            </h3>

            <div className="weekdays">

                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>

            </div>

            <div className="calendar-grid">

                {

                    days.map((day,index)=>(

                        <div
                            key={index}
                            className={`day

                            ${day===26?"today":""}

                            `}
                        >

                            {day}

                            {

                                day===29 &&

                                <span className="dot green"></span>

                            }

                            {

                                day===30 &&

                                <span className="dot red"></span>

                            }

                            {

                                day===27 &&

                                <span className="dot blue"></span>

                            }

                        </div>

                    ))

                }

            </div>

        </Card>

    )

}
