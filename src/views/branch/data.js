import { MoreVertical, Edit, FileText, Trash, BookOpen, Archive } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap'

// const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const province = {
  sindh: { title: 'Sindh', color: 'light-primary' },
  kpk: { title: 'KPK', color: 'light-success' },
  punjab: { title: 'Punjab', color: 'light-warning' },
  balochistan: { title: 'Balochistan', color: 'light-info' }
}

export const data = [
    {
        id: 1,
        name: "Bahadurabad Branch",
        address: "4 Minaar Chowrangi",
        area: "Bahadurabad",
        city: "Karachi",
        province: "sindh",
        longitude: 24.8826687,
        latitude: 67.0658774,
    },
    {
        id: 2,
        name: "Railway Branch",
        address: "railyway station",
        area: "railway station",
        city: "Lahore",
        province: "punjab",
        longitude: 24.8826687,
        latitude: 67.0658774,
    },
    {
        id: 3,
        name: "Branch 3",
        address: "address 3",
        area: "area 3",
        city: "city 3",
        province: "balochistan",
        longitude: 24.8826687,
        latitude: 67.0658774,
    },
    {
        id: 4,
        name: "Branch 4",
        address: "Address 4",
        area: "area 4",
        city: "city 4",
        province: "kpk",
        longitude: 24.8826687,
        latitude: 67.0658774,
    },
  ]
export const multiLingColumns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      maxWidth: '50px'
    },
    {
      name: 'Branch Name',
      selector: 'name',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Address',
      selector: 'address',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Area',
      selector: 'area',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'City',
      selector: 'city',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Province',
      selector: 'province',
      sortable: true,
      minWidth: '200px',
      cell: row => {
        return (
          <Badge color={province[row.province].color} pill>
            {province[row.province].title}
          </Badge>
        )
      }
    },
    {
      name: 'Longitude',
      selector: 'longitude',
      sortable: false,
      minWidth: '200px'
    },
    {
      name: 'Latitude',
      selector: 'latitude',
      sortable: false,
      minWidth: '200px'
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
                  <Trash size={15} />
                  <span className='align-middle ml-50'>Delete</span>
                </DropdownItem>
                <DropdownItem>
                  <Archive size={15} />
                  <span className='align-middle ml-50'>View Inventory</span>
                </DropdownItem>
                <DropdownItem>
                  <BookOpen size={15} />
                  <span className='align-middle ml-50'>Manage</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Edit size={15} />
          </div>
        )
      }
    }
  ]
  