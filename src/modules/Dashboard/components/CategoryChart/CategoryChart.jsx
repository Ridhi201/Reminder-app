import Card from "../../../../components/common/Card";
import "./CategoryChart.css";

export default function CategoryChart() {

    const categories = [

        {
            name: "Work",
            total: 35,
            color: "#2563EB"
        },

        {
            name: "Health",
            total: 28,
            color: "#10B981"
        },

        {
            name: "Personal",
            total: 18,
            color: "#F59E0B"
        },

        {
            name: "Study",
            total: 12,
            color: "#8B5CF6"
        },

        {
            name: "Shopping",
            total: 7,
            color: "#EF4444"
        }

    ];

    return (

        <Card>

            <div className="category-header">

                <h2>Reminder Categories</h2>

                <span>This Month</span>

            </div>

            <div className="category-list">

                {

                    categories.map((item,index)=>(

                        <div
                            className="category-item"
                            key={index}
                        >

                            <div className="category-top">

                                <span>{item.name}</span>

                                <strong>{item.total}%</strong>

                            </div>

                            <div className="progress">

                                <div

                                    className="progress-fill"

                                    style={{

                                        width:`${item.total}%`,
                                        background:item.color

                                    }}

                                />

                            </div>

                        </div>

                    ))

                }

            </div>

        </Card>

    );

}
