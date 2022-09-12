import { MoreVertical, Edit, FileText, Trash, Eye } from 'react-feather'
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
        name: "Package 1",
        person: 5
    },
    {
        id: 2,
        name: "Package 2",
        person: 10
    },
    {
        id: 3,
        name: "Package 3",
        person: 7
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
      name: 'Package Name',
      selector: 'name',
      sortable: true,
      minWidth: '400px'
    },
    {
      name: 'Persons For',
      selector: 'person',
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
            <Eye size={15} className='mr-1'/>
            <Edit size={15} />
          </div>
        )
      }
    }
  ]
  