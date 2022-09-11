import { MoreVertical, Edit, FileText, Trash } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Rejected', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
}

export const data = [
    {
        id: 1,
        name: "Daldha Ghee Cotton 5 KG",
        quantity: 5
    },
    {
        id: 2,
        name: "Mutton Meat",
        quantity: 10
    },
    {
        id: 3,
        name: "Milkpac Container",
        quantity: 7
    },
    {
        id: 4,
        name: "Cow Beef Leg",
        quantity: 9
    },
    {
        id: 5,
        name: "Imtiaz Super Market Rice",
        quantity: 7
    },
    {
        id: 6,
        name: "Imtiaz Super Market Wheat (KG)",
        quantity: 50
    },
    {
        id: 7,
        name: "Pulses",
        quantity: 10
    },
    {
        id: 8,
        name: "Spice",
        quantity: 15
    }
  ]
export const multiLingColumns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      maxWidth: '50px'
    },
    {
      name: 'Item Name',
      selector: 'name',
      sortable: true,
      minWidth: '400px'
    },
    {
      name: 'Quantity',
      selector: 'quantity',
      sortable: true,
      minWidth: '300px'
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: row => {
        return (
          <div className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='pr-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <FileText size={15} />
                  <span className='align-middle ml-50'>Delete</span>
                </DropdownItem>
                <DropdownItem>
                  <Trash size={15} />
                  <span className='align-middle ml-50'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Edit size={15} />
          </div>
        )
      }
    }
  ]
  