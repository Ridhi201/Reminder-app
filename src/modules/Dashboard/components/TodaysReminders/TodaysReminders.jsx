import Card from "../../../../components/common/Card";
import Button from "../../../../components/common/Button";

import "./TodaysReminders.css";

export default function TodaysReminders(){

const reminders=[

{
id:1,
time:"07:00 AM",
title:"Morning Workout",
category:"Health",
priority:"High"
},

{
id:2,
time:"09:00 AM",
title:"Drink Water",
category:"Health",
priority:"Medium"
},

{
id:3,
time:"05:00 PM",
title:"Submit Project",
category:"Work",
priority:"High"
}

];

return(

<Card>

<div className="today-header">

<h2>Today's Reminders</h2>

<Button
variant="ghost"
size="sm"
>

View All

</Button>

</div>

<div className="today-list">

{

reminders.map((item)=>(

<div
key={item.id}
className="today-item"
>

<div className="time">

{item.time}

</div>

<div className="details">

<h4>{item.title}</h4>

<p>

{item.category}

</p>

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

)

}
