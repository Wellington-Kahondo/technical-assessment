'use client'

import { IEmployeeModel, ISkill } from '@/providers/EmployeeProvider/context';
import { useEmployee } from '@/providers/EmployeeProvider';

import { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Modal, Form, Space, InputNumber, Dropdown, MenuProps, Menu, Skeleton, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, MinusCircleOutlined, DownOutlined } from '@ant-design/icons';
import style from '../styles/home.module.css';
import EditEmployeeModal from '@/components/editEmployeeModal';
import DeleteConfirmationModal from '@/components/deleteConfirmationModal';


const { Option } = Select;
type SearchField = keyof IEmployeeModel;

export default function Home() {
  const { createEmployee, getAllEmployees, updateEmployee, deleteEmployee, employeeInfo } = useEmployee();

  const [employees, setEmployees] = useState<IEmployeeModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<IEmployeeModel>({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState<SearchField>('firstName');
  const [selectedValue, setSelectedValue] = useState<string>();

  const [isLoading, setLoading] = useState(true); // State for loading indicator


  const [employeeForm] = Form.useForm();



  useEffect(() => {
    const getEmployees = async () => {
      try {

        const data = await getAllEmployees();
        if (data !== null && data !== undefined) {
          setEmployees(data as IEmployeeModel[]);
        }
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    }
    getEmployees();
  }, [employeeInfo]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        setLoading(true); // Set loading state to true on fetch start
        const data = await getAllEmployees();
        if (data !== null && data !== undefined) {
          setEmployees(data as IEmployeeModel[]);
        }
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      } finally {
        setLoading(false); // Set loading state to false after fetch completes
      }
    }
    getEmployees();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing(false);
    setCurrentEmployee({});
    employeeForm.resetFields();
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const handleOk = async (values: any) => {
    const newEmployee: IEmployeeModel = {
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      contactNumber: values.contactNumber,
      emailAddress: values.emailAddress,
      dateOfBirth: values.dateOfBirth,
      address: {
        street: values.street,
        city: values.city,
        postalCode: values.postalCode,
        country: values.country,
      },
      skills: values.skills.map((skill: ISkill) => ({
        ...skill,
        seniorityRating: skill.seniorityRatingText
          ? { '1': 1, '2': 2, '3': 3, '4': 4 }[skill.seniorityRatingText]
          : undefined
      })) || [],
    };
    if (isEditing) {
      // update employee
      updateEmployee(newEmployee);
      setEmployees(employees.map(emp => emp.emailAddress === currentEmployee?.emailAddress ? newEmployee : emp));

    } else {
      // create employee
      createEmployee(newEmployee)
    }

    setIsModalVisible(false);
    setIsEditing(false);
    setCurrentEmployee({});
    employeeForm.resetFields();

  };

  const handleDelete = () => {
    deleteEmployee(currentEmployee.id as string);
    setEmployees(employees.filter(emp => emp.emailAddress !== currentEmployee.emailAddress));
    setIsDeleteModalVisible(false);
  };

  const handleEdit = (employee: IEmployeeModel) => {
    setCurrentEmployee(employee);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleSearch = () => {
    if (!searchText) {
      return employees;
    }

    return employees.filter(employee => {
      const fieldValue = employee[searchField];
      const value = fieldValue ? fieldValue.toString().toLowerCase() : '';
      return value.includes(searchText.toLowerCase());
    });
  };

  const handleMenuClick = (e: any) => {
    let value: string;

    switch (e.key) {
      case 'firstName':
        value = "First Name";
        break;
      case 'lastName':
        value = "Last Name";
        break;
      case 'emailAddress':
        value = "Email Address";
        break;
      default:
        value = 'First Name';
        break;
    }
    setSelectedValue(value);
    setSearchField(e.key);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="firstName">Name</Menu.Item>
      <Menu.Item key="lastName">Surname</Menu.Item>
      <Menu.Item key="emailAddress">Email</Menu.Item>
    </Menu>
  );

  const columns = [
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Contact', dataIndex: 'contactNumber', key: 'contactNumber' },
    { title: 'Email', dataIndex: 'emailAddress', key: 'emailAddress' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: IEmployeeModel) => (
        <>
          <EditOutlined size={50} style={{ marginRight: 16, width: 50, color: 'blue' }} onClick={() => handleEdit(record)} />
          <DeleteOutlined onClick={() => { setCurrentEmployee(record); setIsDeleteModalVisible(true); }} style={{ color: 'red' }} />
        </>
      ),
    },
  ];

  const pagination = {
    pageSize: 5,
  };

  return (
    <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin tip="Loading..." size="large" fullscreen />
        </div>
      ) :

        (<>
          <div className={style.top_section}>
            <div>
              <h1 className={style.title}>Employees</h1>
              <p>There are {employees !== undefined ? employees.length : 0} employees</p>
            </div>
            {employees?.length > 0 && (
              <div className={style.search_section}>
                <Input
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ marginRight: 10 }}
                />
                <Dropdown overlay={menu} trigger={['click']}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space style={{ marginRight: 10, width: 150 }}>
                      {selectedValue ? `${selectedValue}` : 'Filter by'}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            )}
            <Button size='large' style={{ borderRadius: '30px', padding: '30px', width: 200 }} icon={<PlusOutlined style={{ fontSize: '30px', fontWeight: 'bolder' }} />} type="primary" onClick={showModal}>
              New Employee
            </Button>
          </div>
          {employees !== undefined && employees.length > 0 ? (
            <div className={style.table_container}>
              <Table style={{ background: 'white', padding: '10px', borderRadius: '5px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} pagination={pagination} dataSource={handleSearch()} columns={columns} rowKey="emailAddress" />
            </div>
          ) : (
            <div className={style.bottom_text}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <img alt="example" src="./assets/icon.png" />
              </div>
              <h1 className={style.text}>There is nothing here</h1>
              <p style={{ color: '#777676' }}>
                Create a new employee by clicking the New Employee button to get
                started
              </p>
            </div>
          )}
          <EditEmployeeModal
            isVisible={isModalVisible}
            isEditing={isEditing}
            currentEmployee={currentEmployee}
            onCancel={handleCancel}
            onOk={handleOk}
            form={employeeForm}
          />
          <DeleteConfirmationModal
            isVisible={isDeleteModalVisible}
            onOk={handleDelete}
            onCancel={handleDeleteCancel}
          />
        </>
        )}
    </div>
  );
};
