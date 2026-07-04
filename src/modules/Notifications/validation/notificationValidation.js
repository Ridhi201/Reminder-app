export default function validateNotification(data){

const errors={};

if(!data.title.trim())

errors.title="Title is required.";

if(!data.message.trim())

errors.message="Message is required.";

if(!data.category.trim())

errors.category="Category is required.";

if(

!data.push &&

!data.email &&

!data.sms &&

!data.inApp

){

errors.type="Select at least one notification type.";

}

return errors;

}
