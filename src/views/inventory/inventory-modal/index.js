// ** React Imports
import {useEffect, useState} from 'react'
import Select from 'react-select'

// ** ThemeColor
import {selectThemeColors} from '@utils'

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
import environment from "../../../environment";
import axios from "axios";
import {toast} from "react-toastify";

const itemOptions = [
    {value: 'ocean', label: 'Dalda'},
    {value: 'blue', label: 'Mutton'},
    {value: 'purple', label: 'Rice'},
    {value: 'red', label: 'Wheat'},
    {value: 'orange', label: 'Pulses'},
    {value: 'ocean', label: 'Dalda'},
    {value: 'blue', label: 'Mutton'},
    {value: 'purple', label: 'Rice'},
    {value: 'red', label: 'Wheat'},
    {value: 'orange', label: 'Pulses'}
]

const InventoryModal = ({open, handleModal}) => {
    const [quantity, setQuantity] = useState(0);
    const [item, setItem] = useState({});
    const [itemList, setItemList] = useState([]);

    const handleSubmit = () => {
        axios.post(environment.SERVER_BASE_URL + '/admin/inventory/add', {
            itemId: item.value,
            quantity,
        }).then((res) => {
            toast.success('Item Inventory added')
            handleModal(true);
        }).catch((error) => {
            toast.error('Something Went Wrong');
            console.error(error);
        })
    }

    const fetchData = () => {
        axios.get(environment.SERVER_BASE_URL + '/admin/item/all').then((res) => {
            const data = res.data.map((item) => ({
                label: item.name,
                value: item._id,
            }));
            setItemList(data);
        })
    }

    // ** Custom close btn
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal}/>

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Modal
            isOpen={open}
            toggle={handleModal}
            className='sidebar-sm'
            modalClassName='modal-slide-in'
            contentClassName='pt-0'
        >
            <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
                <h5 className='modal-title'>Add Inventory</h5>
            </ModalHeader>
            <ModalBody className='flex-grow-1'>
                <FormGroup>
                    <Label for='full-name'>Select Item</Label>
                    <Select
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        name='item'
                        options={itemList}
                        isClearable
                        onChange={(e) => setItem(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='quantity'>Quantity</Label>
                    <Input name='quantity' id='quantity' placeholder='Enter Quantity' type='number' value={quantity}
                           onChange={(e) => setQuantity(e.target.value)}/>
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

export default InventoryModal
