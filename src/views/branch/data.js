import { MoreVertical, Edit, FileText, Trash, BookOpen, Archive } from 'react-feather'
import { Link } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap'

// const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const province = {
  sindh: { title: 'Sindh', color: 'light-primary' },
  kpk: { title: 'KPK', color: 'light-success' },
  punjab: { title: 'Punjab', color: 'light-warning' },
  balochistan: { title: 'Balochistan', color: 'light-info' }
}

const status = {
  pending: { title: 'Pending', color: 'light-primary' },
  accepted: { title: 'Accepted', color: 'light-success' },
  rejected: { title: 'Rejected', color: 'light-danger' },
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
                  <Link to={`/branch/inventory/${row.id}`}>
                    <span className='align-middle ml-50'>View Inventory</span>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <BookOpen size={15} />
                  <Link to={`/branch/requests/${row.id}`}>
                    <span className='align-middle ml-50'>Manage</span>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Edit size={15} />
          </div>
        )
      }
    }
  ]

export const branchInventoryData = [
  {
    id: 1,
    name: "Wheat",
    quantity: 50
  },
  {
    id: 2,
    name: "Rice",
    quantity: 40
  },
  {
    id: 3,
    name: "Pulses",
    quantity: 30
  },
  {
    id: 4,
    name: "Spice",
    quantity: 20
  },
  {
    id: 5,
    name: "Sugar",
    quantity: 10
  }
]

export const branchInventoryColumns = [
  {
    name: '#',
    selector: 'id',
    sortable: true,
    maxWidth: '200px'
  },
  {
    name: 'Item Name',
    selector: 'name',
    sortable: true,
    minWidth: '500px'
  },
  {
    name: 'Quantity',
    selector: 'quantity',
    sortable: true,
    minWidth: '200px'
  }
]

export const branchInventoryRequestsData = [
  {
    id: 1,
    name: "User 1",
    email: "abc@xyz.com",
    cnic: "4220176479833",
    person: 5,
    status: "pending"
  },
  {
    id: 2,
    name: "User 2",
    email: "abc1@xyz.com",
    cnic: "4220123456789",
    person: 8,
    status: "accepted"
  },
  {
    id: 3,
    name: "User 3",
    email: "abc3@xyz.com",
    cnic: "4220102454217",
    person: 7,
    status: "rejected"
  },
  {
    id: 4,
    name: "User 4",
    email: "abc4@xyz.com",
    cnic: "4220134567890",
    person: 5,
    status: "accepted"
  },
  {
    id: 5,
    name: "User 5",
    email: "abc5@xyz.com",
    cnic: "4220145678901",
    person: 2,
    status: "pending"
  }
]

export const branchInventoryRequestsColumns = [
  {
    name: '#',
    selector: 'id',
    sortable: true,
    maxWidth: '50px'
  },
  {
    name: 'Full Name',
    selector: 'name',
    sortable: true,
    maxWidth: '200px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    maxWidth: '200px'
  },
  {
    name: 'CNIC No',
    selector: 'cnic',
    sortable: true,
    maxWidth: '200px'
  },
  {
    name: 'No. of Persons',
    selector: 'person',
    sortable: true,
    maxWidth: '350px'
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '200px',
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  }
]