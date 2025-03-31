import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const RequestBloodLater = () => {
    const navigate = useNavigate();
    return (
        <div>
            < div className="flex justify-between items-center py-2" >
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate('/home')}>
                        <i className="ri-arrow-left-s-line text-3xl font-medium text-gray-800"></i>
                    </button>
                    <h4 className="text-xl font-medium text-gray-800">Request Blood</h4>
                </div>
                <div className="flex items-center gap-3">
                    <img
                        className="rounded-full h-9 w-9 object-cover"
                        src="https://yt3.ggpht.com/a/AATXAJxPIvCmwTp3vwBzE9HSYF3CiM-Nl6Ed3cAMJg=s900-c-k-c0xffffffff-no-rj-mo"
                        alt="profilePic"
                    />
                    <i className="ri-notification-2-line text-2xl text-gray-800"></i>
                </div>
            </div >
            <div className='flex flex-col justify-between items-center'>
                <div className='flex flex-col gap-5 items-center justify-between pt-10' >
                    <i className="ri-checkbox-circle-line text-red-700 font-medium text-5xl pt-10"></i>
                    <h4 className='text-xl font-semibold px-8 py-2 text-center' >Your form has been successfully saved.</h4>
                    <button
                        onClick={async () => {
                            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/bloodServices/request-blood-form-update`, {
                                status: true
                            }, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            })
                            if (response.status == 200) {
                                navigate('/nearby-donors')
                            }
                        }}
                        type="submit"
                        className="bg-red-800 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-900 transition-colors"
                    >
                        Request Now
                    </button>
                    <button
                        onClick={async () => {
                            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/bloodServices/delete-request-blood-form`, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            })
                            if (response.status == 200) {
                                navigate('/request-blood')
                            }
                        }}
                        type="submit"
                        className="bg-red-800 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-900 transition-colors"
                    >
                        Delete Request
                    </button>
                </div>

            </div>
        </div>
    )
}

export default RequestBloodLater