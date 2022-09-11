// ** React Imports
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

const provinceOptions = [
    { value: 'sindh', label: 'Sindh' },
    { value: 'balochistan', label: 'Balochistan' },
    { value: 'kpk', label: 'KPK' },
    { value: 'punjab', label: 'Punjab' },
  ]

const BranchModal = ({ open, handleModal }) => {
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
        <h5 className='modal-title'>Add Branch</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
            <Label for='name'>Branch Name</Label>
            <Input  id='name' placeholder='Enter Branch Name' />
        </FormGroup>
        <FormGroup>
            <Label for='address'>Branch Address</Label>
            <Input  id='address' placeholder='Enter Branch Address' />
        </FormGroup>
        <FormGroup>
            <Label for='area'>Branch Area</Label>
            <Input  id='area' placeholder='Enter Branch Area' />
        </FormGroup>
        <FormGroup>
            <Label for='city'>Branch City</Label>
            <Input  id='city' placeholder='Enter Branch City' />
        </FormGroup>
        <FormGroup>
            <Label>Select Province</Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              name='province'
              options={provinceOptions}
              isClearable
            />
        </FormGroup>
        <FormGroup>
            <Label for='longitude'>Longitude</Label>
            <Input  id='longitude' placeholder='Enter Longitude' type='number' />
        </FormGroup>
        <FormGroup>
            <Label for='latitude'>Latitude</Label>
            <Input  id='latitude' placeholder='Enter Latitude' type='number' />
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

export default BranchModal
