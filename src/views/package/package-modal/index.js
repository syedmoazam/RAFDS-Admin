// ** React Imports
import { useState } from 'react'
import Select from 'react-select'

// ** ThemeColor
import { selectThemeColors } from '@utils'

// ** Third Party Components
import { Plus, Trash, X } from 'react-feather'
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

const itemOptions = [
    { value: 'ocean', label: 'Dalda' },
    { value: 'blue', label: 'Mutton' },
    { value: 'purple', label: 'Rice' },
    { value: 'red', label: 'Wheat' },
    { value: 'orange', label: 'Pulses' },
    { value: 'ocean', label: 'Dalda' },
    { value: 'blue', label: 'Mutton' },
    { value: 'purple', label: 'Rice' },
    { value: 'red', label: 'Wheat' },
    { value: 'orange', label: 'Pulses' }
  ]

const PackageModal = ({ open, handleModal }) => {
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    <Modal
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
            <Input  id='name' placeholder='Enter Package Name' />
        </FormGroup>
        <FormGroup>
            <Label for='size'>Package Size</Label>
            <Input  id='size' placeholder='Enter Package Size' />
        </FormGroup>
        <FormGroup>
            <Label for='desc'>Package Description</Label>
            <Input  id='desc' placeholder='Enter Package Description' />
        </FormGroup>
        <FormGroup>
            <Label for='full-name'>Select Item</Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              name='item'
              options={itemOptions}
              isClearable
            />
        </FormGroup>
        <FormGroup>
            <div className='d-flex justify-content-between'>
                <Label for='quantity'>Quantity</Label>
                <Trash size={14} /> 
            </div>
            <Input  id='quantity' placeholder='Enter Quantity' type='number' />
        </FormGroup>
        <FormGroup>
            <div className='d-flex justify-content-end'>
                <Button.Ripple className='btn-icon' color='primary' >
                    <Plus size={14} />
                    <span className='align-middle ml-25'>Add</span>
                </Button.Ripple>
            </div>
        </FormGroup>
        {/* <div className='mt-3'> */}
            <Button className='mr-1' color='primary' onClick={handleModal}>
            Submit
            </Button>
            <Button color='secondary' onClick={handleModal} outline>
            Cancel
            </Button>
        {/* </div> */}
      </ModalBody>
    </Modal>
  )
}

export default PackageModal
