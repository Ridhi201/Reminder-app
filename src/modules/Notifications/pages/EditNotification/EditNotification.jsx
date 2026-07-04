import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../../components/common/PageHeader";
import Button from "../../../../components/common/Button";

import NotificationForm from "../../components/NotificationForm";

import useNotificationForm from "../../hooks/useNotificationForm";

import validateNotification from "../../validation/notificationValidation";

import {
    getNotificationById,
    updateNotification
} from "../../services/notificationService";

import "./EditNotification.css";

export default function EditNotification(){

    const { id } = useParams();

    const navigate = useNavigate();

    const{

        formData,
        setFormData,

        errors,
        setErrors,

        loading,
        setLoading,

        handleChange

    }=useNotificationForm();

    useEffect(()=>{

        loadNotification();

    },[]);

    const loadNotification=async()=>{

        try{

            const res=await getNotificationById(id);

            setFormData(res.data);

        }

        catch(err){

            console.log(err);

        }

    };

    const handleSubmit=async()=>{

        const validationErrors=

        validateNotification(formData);

        if(Object.keys(validationErrors).length){

            setErrors(validationErrors);

            return;

        }

        try{

            setLoading(true);

            await updateNotification(id,formData);

            navigate("/notifications");

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <div className="edit-notification">

            <PageHeader

                title="Edit Notification"

                subtitle="Update Notification"

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

                    onClick={()=>navigate(-1)}

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

                        "Updating..."

                        :

                        "Update Notification"

                    }

                </Button>

            </div>

        </div>

    );

}
