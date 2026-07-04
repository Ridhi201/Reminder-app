import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import PageHeader from "../../../../components/common/PageHeader";
import Card from "../../../../components/common/Card";
import Button from "../../../../components/common/Button";
import StatusBadge from "../../../../components/common/StatusBadge";

import {
    getNotificationById
} from "../../services/notificationService";

import "./ViewNotification.css";

export default function ViewNotification(){

const {id}=useParams();

const navigate=useNavigate();

const [notification,setNotification]=useState(null);

useEffect(()=>{

loadNotification();

},[]);

const loadNotification=async()=>{

try{

const res=

await getNotificationById(id);

setNotification(res.data);

}

catch(err){

console.log(err);

}

};

if(!notification){

return <h3>Loading...</h3>;

}

return(

<div className="view-notification">

<Link to="/notifications" className="back-link" style={{ textDecoration: 'none', color: '#4b5563', fontSize: '14px', marginBottom: '10px', display: 'inline-block' }}>
  ← Back to Notifications
</Link>

<PageHeader

title="View Notification"

subtitle="Notification Details"

showButton={false}

/>

<Card>

<div className="info-grid">

<div>

<label>Title</label>

<p>{notification.title}</p>

</div>

<div>

<label>Category</label>

<p>{notification.category}</p>

</div>

<div>

<label>Priority</label>

<p>{notification.priority}</p>

</div>

<div>

<label>Status</label>

<StatusBadge

status={notification.status}

/>

</div>

<div>

<label>Notification Type</label>

<p>{notification.type}</p>

</div>

<div>

<label>Recipients</label>

<p>{notification.recipients}</p>

</div>

<div>

<label>Schedule</label>

<p>{notification.scheduleType}</p>

</div>

<div>

<label>Scheduled Date</label>

<p>{notification.date}</p>

</div>

<div>

<label>Scheduled Time</label>

<p>{notification.time}</p>

</div>

<div>

<label>Created By</label>

<p>{notification.createdBy}</p>

</div>

<div className="full">

<label>Message</label>

<p>{notification.message}</p>

</div>

<div className="full">

<label>Attachment</label>

{

notification.attachment

?

<a

href={notification.attachment}

target="_blank"

rel="noreferrer"

>

View Attachment

</a>

:

<p>No Attachment</p>

}

</div>

</div>

</Card>

<div className="action-buttons">

<Button

variant="secondary"

onClick={()=>navigate(-1)}

>

Back

</Button>

<Button

onClick={()=>navigate(`/notifications/edit/${id}`)}

>

Edit Notification

</Button>

</div>

</div>

)

}

