// ** React Imports
import {Fragment, useEffect, useState} from 'react'


// ** Third Party Components
import ReactPaginate from 'react-paginate'
import {ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus} from 'react-feather'
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
    Button
} from 'reactstrap'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'
import InventoryModal from '../inventory-modal'

// ** Table Columns
import {data, multiLingColumns} from '../data'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import axios from "axios";
import environment from "../../../environment";

const InventoryList = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [modal, setModal] = useState(false)
    const [inventoryList, setInventoryList] = useState([]);

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
            updatedData = inventoryList.filter(item => {
                const startsWith =
                    item.id.toString().startsWith(value) ||
                    item.name.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.quantity.toString().startsWith(value)

                const includes =
                    item.id.toString().includes(value) ||
                    item.name.toLowerCase().includes(value.toLowerCase())
                item.quantity.toString().includes(value)
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
        const keys = Object.keys(data[0])

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

    // ** Function to handle Modal toggle
    const handleModal = (getInventory = null) => {
        if (getInventory) fetchData();
        setModal(prevState => !prevState)
    }

    const fetchData = () => {
        axios.get(environment.SERVER_BASE_URL + '/admin/inventories/all').then(res => {
            const data = res.data.map((inventory, index) => ({
                ...inventory.item,
                id: index + 1,
                quantity: inventory.quantity
            }));
            setInventoryList(data);
        })
    }

    useEffect(() => {
        fetchData();
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
            pageCount={searchValue.length ? filteredData.length / 7 : data.length / 7 || 1}
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
                breadCrumbTitle="View Inventory"
                breadCrumbParent="Inventory"
                breadCrumbActive="View Inventory"
            />
            <Card>
                <CardHeader className='border-bottom justify-content-between'>
                    <CardTitle tag='h4'>Inventory</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15}/>
                                <span className='align-middle ml-50'>Export</span>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className='w-100'>
                                    <Printer size={15}/>
                                    <span className='align-middle ml-50'>Print</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                                    <FileText size={15}/>
                                    <span className='align-middle ml-50'>CSV</span>
                                </DropdownItem>
                                <DropdownItem className='w-100'>
                                    <Grid size={15}/>
                                    <span className='align-middle ml-50'>Excel</span>
                                </DropdownItem>
                                <DropdownItem className='w-100'>
                                    <File size={15}/>
                                    <span className='align-middle ml-50'>PDF</span>
                                </DropdownItem>
                                <DropdownItem className='w-100'>
                                    <Copy size={15}/>
                                    <span className='align-middle ml-50'>Copy</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        <Button className='ml-2' color='primary' onClick={handleModal}>
                            <Plus size={15}/>
                            <span className='align-middle ml-50'>Add Record</span>
                        </Button>
                    </div>
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
                    columns={multiLingColumns}
                    className='react-dataTable'
                    paginationPerPage={7}
                    sortIcon={<ChevronDown size={10}/>}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={searchValue.length ? filteredData : inventoryList}
                />
            </Card>
            <InventoryModal open={modal} handleModal={handleModal}/>
        </Fragment>
    )
}

export default InventoryList
