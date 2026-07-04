import "./SendNotification.css";

import PageHeader from "../../../../components/common/PageHeader";
import Button from "../../../../components/common/Button";

import NotificationForm from "../../components/NotificationForm";

import useNotificationForm from "../../hooks/useNotificationForm";

import validateNotification from "../../validation/notificationValidation";

import { sendNotification } from "../../services/notificationService";

export default function SendNotification(){

const{

formData,

errors,

loading,

setErrors,

setLoading,

handleChange,

resetForm

}=useNotificationForm();

const handleSubmit=async()=>{

const validationErrors=

validateNotification(formData);

if(Object.keys(validationErrors).length){

setErrors(validationErrors);

return;

}

try{

setLoading(true);

await sendNotification(formData);

alert("Notification Sent Successfully");

resetForm();

}

catch(err){

console.log(err);

alert("Unable to Send Notification");

}

finally{

setLoading(false);

}

}

return(

<div className="send-page">

<PageHeader

title="Send Notification"

subtitle="Create and send notifications"

showButton={false}

/>

<NotificationForm

formData={formData}

errors={errors}

handleChange={handleChange}

/>

<div className="page-actions">

<Button

variant="secondary"

onClick={() => resetForm()}

>

Cancel

</Button>

<Button

onClick={handleSubmit}

disabled={loading}

>

{

loading

?

"Sending..."

:

"Send Notification"

}

</Button>

</div>

</div>

)

}
