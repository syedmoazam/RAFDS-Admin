// ** React Imports
import { useState } from 'react'
import Select from 'react-select'

// ** ThemeColor
import { selectThemeColors } from '@utils'

// ** Third Party Components
import { X } from 'react-feather'
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

const InventoryModal = ({ open, handleModal }) => {
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
              options={itemOptions}
              isClearable
            />
        </FormGroup>
        <FormGroup>
            <Label for='quantity'>Quantity</Label>
            <Input  id='quantity' placeholder='Enter Quantity' type='number' />
        </FormGroup>
        <Button className='mt-4 mr-1' color='primary' onClick={handleModal}>
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
