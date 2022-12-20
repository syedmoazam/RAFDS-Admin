// ** React Imports
import {useState} from "react";
// ** Third Party Components
import {X} from 'react-feather'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Input,
    Label
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import axios from "axios";
import environment from "../../../environment";
import {toast} from "react-toastify";

const BranchModal = ({open, handleModal}) => {
    const [branchName, setBranchName] = useState('');
    const [branchAddress, setBranchAddress] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    const handleSubmit = () => {
        axios.post(environment.SERVER_BASE_URL + '/admin/branch/create', {
            name: branchName,
            address: branchAddress,
            latitude,
            longitude,
        }).then((res) => {
            toast.success(`${res.data.message} and username ${res.data.username}`)
            handleModal(true);
        })
    }

    // ** Custom close btn
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal}/>

    return (
        <Modal
            isOpen={open}
            toggle={handleModal}
            className='sidebar-sm'
            modalClassName='modal-slide-in'
            contentClassName='pt-0'
        >
            <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
                <h5 className='modal-title'>Add Branch</h5>
            </ModalHeader>
            <ModalBody className='flex-grow-1'>
                <FormGroup>
                    <Label for='name'>Branch Name</Label>
                    <Input value={branchName} id='name' placeholder='Enter Branch Name'
                           onChange={(e) => setBranchName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for='address'>Branch Address</Label>
                    <Input value={branchAddress} id='address' placeholder='Enter Branch Address'
                           onChange={(e) => setBranchAddress(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for='longitude'>Longitude</Label>
                    <Input value={longitude} id='longitude' placeholder='Enter Longitude' type='number'
                           onChange={(e) => setLongitude(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for='latitude'>Latitude</Label>
                    <Input value={latitude} id='latitude' placeholder='Enter Latitude' type='number'
                           onChange={(e) => setLatitude(e.target.value)}/>
                </FormGroup>
                <Button className='mt-4 mr-1' color='primary' onClick={handleSubmit}>
                    Submit
                </Button>
                <Button color='secondary mt-4' onClick={handleModal} outline>
                    Cancel
                </Button>
            </ModalBody>
        </Modal>
    )
}

export default BranchModal
