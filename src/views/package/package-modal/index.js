// ** React Imports
import {useEffect, useState} from 'react'
import Select from 'react-select'

// ** ThemeColor
import {selectThemeColors} from '@utils'

// ** Third Party Components
import {Plus, Trash, X} from 'react-feather'
import {
    Button, Modal, ModalHeader, ModalBody, FormGroup, Input, Label
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import axios from "axios";
import environment from "../../../environment";
import {toast} from "react-toastify";

const PackageModal = ({open, handleModal}) => {
    const [itemsList, setItemsList] = useState([]);
    const [itemFields, setItemFields] = useState([]);
    const [packageName, setPackageName] = useState('');
    const [packageSize, setPackageSize] = useState(0);

    const handleFormChange = (index, name, value) => {
        let data = [...itemFields];
        data[index][name] = value;
        setItemFields(data);
    }

    const addFields = () => {
        let newfield = {itemId: '', quantity: 0}
        setItemFields([...itemFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...itemFields];
        data.splice(index, 1)
        setItemFields(data)
    }

    const handleSubmit = () => {
        if(!packageName) toast.error('Enter package name');
        if(!packageSize) toast.error('Enter package size');
        if(!itemsList.length) toast.error('Add Items in Package');
        const areFieldsFilled = itemFields.every((item) => item.quantity && item.itemId)
        if(!areFieldsFilled) {
            toast.error('Please fill all the item fields');
        }
        if(packageName && packageSize && itemFields.length && areFieldsFilled) {
            axios.post(environment.SERVER_BASE_URL + '/admin/package/create', {
                name: packageName,
                personCount: packageSize,
                items: itemFields.map((item) => ({
                    id: item.itemId,
                    quantity: item.quantity
                }))
            }).then((res) => {
                toast.success('Package Created');
                handleModal(true);
            })
        }
    }

    useEffect(() => {
        axios.get(environment.SERVER_BASE_URL + '/admin/item/all').then(({data}) => {
            setItemsList(() => (data.map((item) => ({
                label: item.name, value: item._id,
            }))));
        }).catch((err) => {
            toast.error('Something went wrong');
            console.error('error ===> ', err);
        })
    }, [])

    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal}/>

    return (<Modal
        isOpen={open}
        toggle={handleModal}
        className='sidebar-sm'
        modalClassName='modal-slide-in'
        contentClassName='pt-0'
    >
        <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
            <h5 className='modal-title'>Create Package</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1'>
            <FormGroup>
                <Label for='name'>Package Name</Label>
                <Input onChange={(e) => setPackageName(e.target.value)} id='name' placeholder='Enter Package Name'/>
            </FormGroup>
            <FormGroup>
                <Label for='size'>Package Size</Label>
                <Input onChange={(e) => setPackageSize(e.target.value)} id='size' placeholder='Enter Package Size'/>
            </FormGroup>
            {
                itemFields.map((itemField, index) => (
                    <div key={'item-fields-' + index}>
                        <FormGroup>
                            <div className='d-flex justify-content-end'>
                                <Button onClick={() => removeFields(index)}>
                                    <Trash size={14}/>
                                </Button>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <Label for='full-name'>Select Item</Label>
                            </div>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                name='item'
                                options={itemsList}
                                onChange={(e) => handleFormChange(index, 'itemId', e.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <div className='d-flex justify-content-between'>
                                <Label for='quantity'>Quantity</Label>
                            </div>
                            <Input value={itemField.value} name='quantity' id='quantity' placeholder='Enter Quantity'
                                   type='number' onChange={event => handleFormChange(index, event.target.name, event.target.value)}/>
                        </FormGroup>
                    </div>
                ))
            }
            <FormGroup>
                <div className='d-flex justify-content-end'>
                    <Button.Ripple onClick={addFields} className='btn-icon' color='primary'>
                        <Plus size={14}/>
                        <span className='align-middle ml-25'>Add</span>
                    </Button.Ripple>
                </div>
            </FormGroup>
            {/* <div className='mt-3'> */}
            <Button className='mr-1' color='primary' onClick={handleSubmit}>
                Submit
            </Button>
            <Button color='secondary' onClick={handleModal} outline>
                Cancel
            </Button>
            {/* </div> */}
        </ModalBody>
    </Modal>)
}

export default PackageModal
