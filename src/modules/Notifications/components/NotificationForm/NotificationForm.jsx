import Card from "../../../../components/common/Card";
import Input from "../../../../components/common/Input";
import Checkbox from "../../../../components/common/Checkbox";

import "./NotificationForm.css";

export default function NotificationForm({

    formData,

    errors,

    handleChange

}){

return(

<div className="notification-form">

{/* Information */}

<Card>

<h3>Notification Information</h3>

<div className="grid-2">

<Input
label="Title"
name="title"
value={formData.title}
onChange={handleChange}
error={errors.title}
placeholder="Enter notification title"
/>

<div className="full">

<label>Message</label>

<textarea

name="message"

rows="5"

value={formData.message}

onChange={handleChange}

placeholder="Write notification message"

></textarea>

{

errors.message &&

<p className="error">

{errors.message}

</p>

}

</div>

<select

name="category"

value={formData.category}

onChange={handleChange}

>

<option value="">Category</option>

<option>General</option>

<option>Reminder</option>

<option>Updates</option>

<option>Promotion</option>

</select>

<select

name="priority"

value={formData.priority}

onChange={handleChange}

>

<option>Low</option>

<option>Medium</option>

<option>High</option>

<option>Critical</option>

</select>

</div>

</Card>

{/* Notification Type */}

<Card>

<h3>Notification Type</h3>

<div className="checkbox-grid">

<Checkbox

label="Push Notification"

name="push"

checked={formData.push}

onChange={handleChange}

/>

<Checkbox

label="Email Notification"

name="email"

checked={formData.email}

onChange={handleChange}

/>

<Checkbox

label="SMS Notification"

name="sms"

checked={formData.sms}

onChange={handleChange}

/>

<Checkbox

label="In-App Notification"

name="inApp"

checked={formData.inApp}

onChange={handleChange}

/>

</div>

</Card>

{/* Recipients */}

<Card>

<h3>Recipients</h3>

<div className="radio-group">

<label>

<input

type="radio"

name="recipientType"

value="all"

checked={formData.recipientType==="all"}

onChange={handleChange}

/>

All Users

</label>

<label>

<input

type="radio"

name="recipientType"

value="selected"

checked={formData.recipientType==="selected"}

onChange={handleChange}

/>

Selected Users

</label>

<label>

<input

type="radio"

name="recipientType"

value="role"

checked={formData.recipientType==="role"}

onChange={handleChange}

/>

User Role

</label>

</div>

</Card>

{/* Schedule */}

<Card>

<h3>Schedule</h3>

<div className="grid-2">

<label>

<input

type="radio"

name="scheduleType"

value="now"

checked={formData.scheduleType==="now"}

onChange={handleChange}

/>

Send Now

</label>

<label>

<input

type="radio"

name="scheduleType"

value="later"

checked={formData.scheduleType==="later"}

onChange={handleChange}

/>

Schedule Later

</label>

<input

type="date"

name="date"

value={formData.date}

onChange={handleChange}

/>

<input

type="time"

name="time"

value={formData.time}

onChange={handleChange}

/>

</div>

</Card>

{/* Attachment */}

<Card>

<h3>Attachment</h3>

<input

type="file"

name="attachment"

accept=".jpg,.jpeg,.png,.pdf"

onChange={handleChange}

/>

</Card>

{/* Preview */}

<Card>

<h3>Notification Preview</h3>

<div className="preview">

<h4>

{formData.title || "Notification Title"}

</h4>

<p>

{formData.message || "Notification message preview..."}

</p>

<span>

Priority : {formData.priority}

</span>

</div>

</Card>

</div>

)

}
