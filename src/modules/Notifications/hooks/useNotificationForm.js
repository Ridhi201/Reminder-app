import { useState } from "react";

const initialState={

title:"",

message:"",

priority:"Medium",

category:"",

push:true,

email:false,

sms:false,

inApp:true,

recipientType:"all",

scheduleType:"now",

date:"",

time:"",

attachment:null

};

export default function useNotificationForm(){

const [formData,setFormData]=useState(initialState);

const [errors,setErrors]=useState({});

const [loading,setLoading]=useState(false);

const handleChange=(e)=>{

const{

name,

value,

type,

checked,

files

}=e.target;

setFormData(prev=>({

...prev,

[name]:

type==="checkbox"

?

checked

:

type==="file"

?

files[0]

:

value

}));

};

const resetForm=()=>{

setFormData(initialState);

setErrors({});

};

return{

formData,

errors,

loading,

setErrors,

setLoading,

handleChange,

resetForm

};

}
