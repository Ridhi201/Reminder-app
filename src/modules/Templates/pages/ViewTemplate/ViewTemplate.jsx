import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../../components/common/PageHeader";
import Card from "../../../../components/common/Card";
import Button from "../../../../components/common/Button";
import StatusBadge from "../../../../components/common/StatusBadge";

import { getTemplateById } from "../../services/templateService";

import "./ViewTemplate.css";

export default function ViewTemplate() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [template, setTemplate] = useState(null);

    useEffect(() => {

        loadTemplate();

    }, []);

    const loadTemplate = async () => {

        try {

            const res = await getTemplateById(id);

            setTemplate(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!template) {

        return <p>Loading...</p>;

    }

    return (

        <div className="view-template">

            <PageHeader

                title="View Template"

                subtitle="Reminder Template Details"

                showButton={false}

            />

            <Card>

                <div className="info-grid">

                    <div>

                        <label>Template Name</label>

                        <p>{template.name}</p>

                    </div>

                    <div>

                        <label>Category</label>

                        <p>{template.category}</p>

                    </div>

                    <div>

                        <label>Priority</label>

                        <p>{template.priority}</p>

                    </div>

                    <div>

                        <label>Status</label>

                        <StatusBadge status={template.status} />

                    </div>

                    <div>

                        <label>Repeat</label>

                        <p>{template.repeat}</p>

                    </div>

                    <div>

                        <label>Reminder Time</label>

                        <p>{template.reminderTime}</p>

                    </div>

                    <div className="full">

                        <label>Description</label>

                        <p>{template.description}</p>

                    </div>

                    <div className="full">

                        <label>Default Notes</label>

                        <p>{template.notes}</p>

                    </div>

                </div>

            </Card>

            <div className="action-buttons">

                <Button

                    variant="secondary"

                    onClick={() => navigate(-1)}

                >

                    Back

                </Button>

                <Button

                    onClick={() => navigate(`/templates/edit/${id}`)}

                >

                    Edit Template

                </Button>

            </div>

        </div>

    );

}
