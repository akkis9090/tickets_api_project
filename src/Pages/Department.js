import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Department = () => {
    // Display Department Data List
    const [departmentList, setDepartmentList] = useState([]);
    const showDepartmentData = async () => {
        const result = await axios.get("https://freeapi.miniprojectideas.com/api/TicketsNew/GetDepartments")
        setDepartmentList(result.data.data)
        setIsLoader(false)
    }

    // Loaders
    let [isLoader, setIsLoader] = useState(true);

    // Create Department
    const [departmentObj, setDepartmentObj] = useState(
        {
            "deptId": 0,
            "deptName": "",
            "createdDate": new Date()
        }
    )

    const saveDepartment = async () => {
        debugger
        const result = await axios.post("https://freeapi.miniprojectideas.com/api/TicketsNew/CreateDepartment", departmentObj)
        if (result.data.result) {
            alert("Save Department")
            showDepartmentData()
            reset1()
            setisShowForm(false)
        } else {
            alert(result.data.message)
        }

    }

    const changeFormValue = (event, key) => {
        setDepartmentObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    // Edit Department
    const editDepartment = (item) => {
        setisShowForm(true)
        setDepartmentObj(prevObj => ({
            ...prevObj, deptId: item.deptId,
            deptName: item.deptName,
            createdDate: item.createdDate
        }))
    }
    // const DetailsDepartment = (item) => {
    //     setisShowForm(true)
    //     setDepartmentObj(prevObj => ({
    //         ...prevObj, deptId: item.deptId,
    //         deptName: item.deptName,
    //         createdDate: item.createdDate
    //     }))

    // }


    // Update Department
    const updateDepartment = async () => {
        try {
            const result = await axios.put("https://freeapi.miniprojectideas.com/api/TicketsNew/UpdateDepartment", departmentObj)
            if (result.data.result) {
                alert("Update Successfully")
                showDepartmentData()
                reset1()
                setisShowForm(false)
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
        }
    }

    // Delete Department
    const deleteDepartment = async (id) => {
        const isDelete = window.confirm("Do you Want to Delete");
        if (isDelete) {
            const result = await axios.delete("https://freeapi.miniprojectideas.com/api/TicketsNew/DeleteDepartment?id=" + id)
            if (result.data.result) {
                alert("Department Removed")
                showDepartmentData()

            } else {
                alert(result.data.message)
            }
        }
    }

    // Reset Button
    const reset1 = () => {
        setDepartmentObj({
            "deptId": 0,
            "deptName": "",
            "createdDate": new Date()
        })
    }


    // UseEffect 
    useEffect(() => {
        showDepartmentData()
    }, [])

    // Show And Hide
    let [isShowForm, setisShowForm] = useState(false);
    let [isShowCard, setisShowCard] = useState(false);
    const showForm = () => {
        setisShowForm(true);
    }

    const closeForm = () => {
        reset1()
        setisShowForm(false);
    }

    const showCard = () => {
        setisShowCard(true);
    }

    const showTable = () => {
        setisShowCard(false);
    }
    return (
        <div>
            <div className='container m-auto mt-5'>
                {!isShowForm &&
                    <div className='card'>
                        <div className='card-title text-center mt-4'>
                            <h1>Department Listing</h1>
                        </div>
                        <div className='card-body'>
                            <div >
                                <Link className='btn btn-success ' onClick={showForm}>Add Data</Link>
                                {!isShowCard && (
                                    <button className='btn btn-body btn-success m-2' onClick={showCard}>

                                        card
                                    </button>
                                )}

                                {isShowCard && (
                                    <button className='btn btn-body  btn-success m-2' onClick={showTable}>

                                        Table
                                    </button>
                                )}


                            </div>
                            <table className='table table-bordered mt-4' >
                                <thead >
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Department Name</th>
                                        <th>Created Date</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                {
                                    isLoader && <tbody>
                                        <tr>
                                            <td colSpan={12} className='text-center'>
                                                <div class="spinner-border text-muted"></div>
                                                <div class="spinner-border text-primary"></div>
                                                {/* <div class="spinner-border text-success"></div>
                                                    <div class="spinner-border text-info"></div>
                                                    <div class="spinner-border text-warning"></div>
                                                    <div class="spinner-border text-danger"></div>
                                                    <div class="spinner-border text-secondary"></div>
                                                    <div class="spinner-border text-dark"></div>
                                                    <div class="spinner-border text-light"></div> */}
                                            </td>
                                        </tr>
                                    </tbody>
                                }

                                <tbody>
                                    {departmentList &&
                                        departmentList.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.deptName}</td>
                                                <td>{item.createdDate}</td>
                                                <td>
                                                    <Link className='btn btn-primary m-2' onClick={() => { editDepartment(item) }}><FaEdit /></Link>
                                                    <Link className='btn btn-danger m-2' onClick={() => { deleteDepartment(item.deptId) }}><FaTrashAlt /></Link>
                                                    {/* <Link className='btn btn-primary m-2' onClick={() => { DetailsDepartment(item) }}><CgDetailsMore /></Link> */}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }


                {isShowForm &&
                    <div className='row  m-auto mt-5'>
                        <div className='offset-lg-3 col-lg-6'>
                            <form className='container'>
                                <div className='card'>
                                    <div className='card-title text-center mt-4'>
                                        <h1>Department </h1>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-lg-12'>

                                                {/* <div className='form-group'>
                                                    <label>ID</label>
                                                    <input disabled="disabled" className='form-control'></input>
                                                </div> */}

                                                <div className='form-group'>
                                                    <label>Department Name</label>
                                                    <input type='text' className='form-control' value={departmentObj.deptName} onChange={(event) => { changeFormValue(event, 'deptName') }}></input>
                                                </div>

                                                <div className='form-group'>
                                                    <label>Email</label>
                                                    <input type='date' className='form-control' value={departmentObj.createdDate} onChange={(event) => { changeFormValue(event, 'createdDate') }} ></input>
                                                </div>



                                                {/* <div className="col-lg-12">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input"></input>
                                                        <label className="form-check-label">Is Active</label>
                                                    </div>
                                                </div> */}

                                                <div className='form-group '>
                                                    {departmentObj.deptId === 0 && <Link className="btn btn-primary m-2" onClick={saveDepartment}>Save Data</Link>}
                                                    {departmentObj.deptId !== 0 && <Link className="btn btn-warning m-2" onClick={updateDepartment}>Update Data</Link>}
                                                    <Link onClick={closeForm} className='btn btn-danger m-2'>Back</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                }

                {/* {isShowForm &&
                    <div className='container  m-auto mt-5 w-50'>
                        <div className='card'>
                            <div className='card-title text-center mt-4'>
                                <h1>Employee Details</h1>
                            </div>
                            <div className='card-body mx-4'>

                                {departmentObj &&
                                    <div>
                                        <h4><b>The Employee Name is:</b> {departmentObj.deptId}</h4>
                                        <h4><b>Email is:</b> {departmentObj.deptName}</h4>
                                        <h4><b>Phone is:</b> {departmentObj.createdDate}</h4>
                                        <Link to='/employee' className='btn btn-danger mt-4'>Back</Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                } */}
            </div>
        </div>
    );
};

export default Department;