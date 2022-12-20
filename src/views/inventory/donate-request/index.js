// ** React Imports
import {Fragment, useEffect, useState} from 'react'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import {ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, Eye} from 'react-feather'
import {FormattedMessage} from 'react-intl'
import DataTable from 'react-data-table-component'
import {
    Card,
    CardHeader,
    CardTitle,
    CardFooter,
    CardText,
    Input,
    Label,
    Row,
    Col,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    ModalHeader, ModalBody, FormGroup, ModalFooter, Modal
} from 'reactstrap'
// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'
// ** Table Columns
import {branchInventoryRequestsData, branchInventoryRequestsColumns} from '../../branch/data'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import axios from "axios";
import {useParams} from "react-router-dom";
import environment from "../../../environment";
import {toast} from "react-toastify";
import Select from "react-select";
import {selectThemeColors} from '@utils'

const statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Accepted', value: 'Accepted' },
    { label: 'Rejected', value: 'Rejected' },
]

const DonateRequest = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [userRequests, setUserRequests] = useState([]);
    const [modal, setModal] = useState(false);
    const [requestId, setRequestId] = useState('');
    const [packageList, setPackageList] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState({});
    const [selectedStatus, setSelectedStatus] = useState({});
    const { id } = useParams();

    const handleModal = (data = null) => {
        if (data) setRequestId(data._id);
        setModal((prevState) => !prevState);
    }

    const handleSubmit = () => {
        if(selectedPackage.value && selectedStatus.value) {
            axios.patch(environment.SERVER_BASE_URL + '/branch/needy-request/change-status', {
                id: requestId,
                status: selectedStatus.value,
                packageId: selectedPackage.value,
                branchId: id,
            }).then((res) => {
                toast.success('Status Changed');
                fetchData();
            }).catch((err) => {
                toast.error(err.response.data.message || 'Something Went Wrong');
                console.error(err.response);
            })
        }
        else {
            toast.error('Kindly Fill all the fields');
        }
    }

    const fetchPackages = () => {
        axios.get(environment.SERVER_BASE_URL + '/admin/packages/all').then(res => {
            const packages = res.data.map((packageInfo) => ({
                label: packageInfo.packageRecord.name,
                value: packageInfo.packageRecord._id,
                person: packageInfo.packageRecord.person,
            }));
            setPackageList(packages)
        })
    }

    const fetchData = () => {
        axios.get(environment.SERVER_BASE_URL + '/branch/needy-request/' + id).then((res) => {
            const data = res.data.map((item, index) => ({
                id: index + 1,
                name: item.user.firstName + ' ' + item.user.lastName,
                email: item.user.email,
                nic: item.user.nic,
                person: item.user.familyMembersCount,
                witnessName1: item.witnessName1,
                witnessName2: item.witnessName2,
                witnessCNIC1: item.witnessCNIC1,
                witnessCNIC2: item.witnessCNIC2,
                status: item.status,
                _id: item._id,
                cb: handleModal,
            }));
            setUserRequests(data);
        }).catch((error) => {
            toast.error('Something Went Wrong');
            console.error(error);
        })
    }

    // ** Function to handle pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    // ** Function to handle filter
    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)

        if (value.length) {
            updatedData = userRequests.filter(item => {
                const startsWith =
                    item.id.toString().startsWith(value) ||
                    item.name.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.email.startsWith(value) ||
                    item.nic.startsWith(value) ||
                    item.person.toString().startsWith(value) ||
                    item.witnessName1.toString().startsWith(value) ||
                    item.witnessCNIC1.toString().startsWith(value) ||
                    item.witnessName2.toString().startsWith(value) ||
                    item.witnessCNIC2.toString().startsWith(value) ||
                    item.status.toString().toLowerCase().startsWith(value)

                const includes =
                    item.id.toString().includes(value) ||
                    item.name.toLowerCase().includes(value.toLowerCase())
                item.email.includes(value) ||
                item.nic.includes(value) ||
                item.person.toString().includes(value) ||
                item.witnessName1.toString().includes(value) ||
                item.witnessCNIC1.toString().includes(value) ||
                item.witnessName2.toString().includes(value) ||
                item.witnessCNIC2.toString().includes(value) ||
                item.status.toString().toLowerCase().includes(value)

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setFilteredData(updatedData)
            setSearchValue(value)
        }
    }

    // ** Converts table to CSV
    function convertArrayOfObjectsToCSV(array) {
        let result

        const columnDelimiter = ','
        const lineDelimiter = '\n'
        const keys = Object.keys(userRequests[0])

        result = ''
        result += keys.join(columnDelimiter)
        result += lineDelimiter

        array.forEach(item => {
            let ctr = 0
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter

                result += item[key]

                ctr++
            })
            result += lineDelimiter
        })

        return result
    }

    // ** Downloads CSV
    function downloadCSV(array) {
        const link = document.createElement('a')
        let csv = convertArrayOfObjectsToCSV(array)
        if (csv === null) return

        const filename = 'export.csv'

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`
        }

        link.setAttribute('href', encodeURI(csv))
        link.setAttribute('download', filename)
        link.click()
    }

    useEffect(() => {
        fetchData();
        fetchPackages();
    }, [])

    // ** Pagination Previous Component
    const Previous = () => {
        return (
            <Fragment>
        <span className='align-middle d-none d-md-inline-block'>
          Prev
        </span>
            </Fragment>
        )
    }

    // ** Pagination Next Component
    const Next = () => {
        return (
            <Fragment>
        <span className='align-middle d-none d-md-inline-block'>
          Next
        </span>
            </Fragment>
        )
    }

    // ** Custom Pagination Component
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel={<Previous size={15}/>}
            nextLabel={<Next size={15}/>}
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={searchValue.length ? filteredData.length / 7 : userRequests.length / 7 || 1}
            breakLabel={'...'}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName={'active'}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName={'pagination react-paginate pagination-sm justify-content-end pr-1 mt-1'}
        />
    )

    return (
        <Fragment>
            <BreadCrumbs
                breadCrumbTitle="View Requests"
                breadCrumbParent="Branch"
                breadCrumbActive="View Branch Inventory"
            />
            <Card>
                <CardHeader className='border-bottom justify-content-between'>
                    <CardTitle tag='h4'>Inventory Requests</CardTitle>
                </CardHeader>
                <Row className='justify-content-end mx-0'>
                    <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
                        <Label className='mr-1 form-label' for='search-input-1'>
                            <FormattedMessage id='Search'/>
                        </Label>
                        <Input
                            className='dataTable-filter mb-50'
                            type='text'
                            bsSize='sm'
                            id='search-input-1'
                            value={searchValue}
                            onChange={handleFilter}
                        />
                    </Col>
                </Row>
                <DataTable
                    noHeader
                    pagination
                    selectableRowsNoSelectAll
                    columns={branchInventoryRequestsColumns}
                    className='react-dataTable'
                    paginationPerPage={7}
                    sortIcon={<ChevronDown size={10}/>}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={searchValue.length ? filteredData : userRequests}
                />
            </Card>
            <Modal isOpen={modal} toggle={() => setModal(!modal)}
                   className='modal-dialog-centered'>
                <ModalHeader toggle={() => setModal(!modal)}>Change Status</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='size'>Select Package</Label>
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            name='item'
                            options={packageList}
                            isClearable
                            onChange={(e) => setSelectedPackage(e)}
                        />
                        {/*<Input value={branchInfo?.name} disabled/>*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for='size'>Package for Person</Label>
                        <Input value={selectedPackage?.person} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='size'>Select Status</Label>
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            name='item'
                            options={statusOptions}
                            isClearable
                            onChange={(e) => setSelectedStatus(e)}
                        />
                        {/*<Input value={branchInfo?.address} disabled/>*/}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={() => handleSubmit()}>
                        Submit
                    </Button>{' '}
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

export default DonateRequest
