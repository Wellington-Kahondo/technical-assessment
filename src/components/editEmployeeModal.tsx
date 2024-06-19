import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, InputNumber, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { IEmployeeModel } from '@/providers/EmployeeProvider/context';

import moment from 'moment';

interface EditEmployeeModalProps {
    isVisible: boolean;
    isEditing: boolean;
    currentEmployee: IEmployeeModel;
    onCancel: () => void;
    onOk: (values: any) => void;
    form: any;
}

enum SeniorityRating {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Advanced = "Advanced",
    Expert = "Expert"
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ isVisible, isEditing, currentEmployee, onCancel, onOk, form }) => {
    
   
    useEffect(() => {
        if (currentEmployee && form) {
            form.setFieldsValue({
                ...currentEmployee,
                street: currentEmployee?.address?.street,
                city: currentEmployee?.address?.city,
                postalCode: currentEmployee?.address?.postalCode,
                country: currentEmployee?.address?.country,
                dateOfBirth: currentEmployee?.dateOfBirth 
                ? moment(currentEmployee.dateOfBirth).format('YYYY-MM-DD') 
                : undefined,
                skills: currentEmployee?.skills?.map(skill => ({
                    ...skill,
                    seniorityRating: skill.seniorityRating 
                    ? { '1': 'Beginner', '2': 'Intermediate', '3': 'Advanced', '4': 'Expert' }[skill.seniorityRating] 
                    : undefined
                })) || []
            });
        }
    }, [currentEmployee, form]);

    return (
        <Modal
            title={isEditing ? "Edit Employee" : "New Employee"}
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Form
                onFinish={onOk}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="ID"
                    name="id"
                    hidden={true}
                >
                    <Input />
                </Form.Item>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input first name!' }]}
                        style={{ flex: 1 }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input last name!' }]}
                        style={{ flex: 1 }}
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                    <Form.Item
                        label="Email Address"
                        name="emailAddress"
                        rules={[
                            { required: true, message: 'Please input email address!' },
                            { type: 'email', message: 'The input is not valid email!' }
                        ]}
                        style={{ flex: 1 }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Contact Number"
                        name="contactNumber"
                        style={{ flex: 1 }}
                    >
                        <Input />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Date of Birth"
                    name="dateOfBirth"                   
                    style={{ width: 200 }}
                >
                    <Input type='date' />
                </Form.Item>
                <Form.Item label="Street" name="street">
                    <Input.TextArea />
                </Form.Item>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                    <Form.Item label="City" name="city" style={{ flex: 1 }}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Postal Code" name="postalCode" style={{ flex: 1 }}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Country" name="country" style={{ flex: 1 }}>
                        <Input />
                    </Form.Item>
                </div>
                <Form.List name="skills">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'id']}
                                        hidden={true}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        rules={[{ required: true, message: 'Missing skill name' }]}
                                        style={{ flex: 2}}
                                        label="Skill Name"
                                    >
                                        <Input placeholder="Skill Name" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'yearsExperience']}
                                        style={{ flex: 1 }}
                                        label="Yrs Exp"
                                    >
                                        <InputNumber placeholder="Years Experience" style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'seniorityRatingText']}                                       
                                        style={{ flex: 1 }}
                                        label="Rating"
                                    >
                                        <Select
                                            style={{ width: 120 }}
                                            options={[
                                                { value: '1', label: SeniorityRating.Beginner },
                                                { value: '2', label: SeniorityRating.Intermediate },
                                                { value: '3', label: SeniorityRating.Advanced },
                                                { value: '4', label: SeniorityRating.Expert },
                                            ]}
                                        />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </div>
                            ))}
                            <Form.Item>
                                <Button size='large' style={{ borderRadius: '20px' }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Skill
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default EditEmployeeModal;
