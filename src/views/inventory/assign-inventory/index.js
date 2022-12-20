import {Fragment, useEffect, useState} from "react"

import {toast} from "react-toastify"
import {
    Card,
    CardBody,
    Button,
    FormGroup,
    Label,
    Input,
} from "reactstrap"

import Breadcrumbs from "@components/breadcrumbs"
import axios from "axios";
import environment from "../../../environment";
import Select from "react-select";
import {selectThemeColors} from '@utils'

const AssignInventory = () => {
    const [itemsList, setItemsList] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState({});
    const [selectedItem, setSelectedItem] = useState({});
    const [quantity, setQuantity] = useState(0)

    const fetchBranches = () => {
        axios.get(environment.SERVER_BASE_URL + '/admin/branches/all').then((res) => {
            const data = res.data.map((item, index) => ({
                ...item,
                label: item.name,
                value: item._id,
                id: index + 1
            }));
            setBranchList(data);
        })
    }

    const fetchItems = () => {
        axios.get(environment.SERVER_BASE_URL + '/admin/item/all').then(({data}) => {
            setItemsList(() => (data.map((item) => ({
                label: item.name, value: item._id,
            }))));
        }).catch((err) => {
            toast.error('Something went wrong');
            console.error('error ===> ', err);
        })
    }

    const handleSubmit = () => {
        if (selectedBranch && selectedItem && quantity) {
            axios.post(environment.SERVER_BASE_URL + '/admin/inventories/assign-to-branch/' + selectedBranch._id, {
                items: [{
                    id: selectedItem.value,
                    quantity
                }]
            }).then((res) => {
                toast.success(res.data.message);
            }).catch((error) => {
                toast.error('Something went wrong');
                console.error(error);
            })
        } else {
            toast.error('Please Fill All Fields');
        }
    }

    useEffect(() => {
        fetchBranches();
        fetchItems();
    }, [])

    return (
        <Fragment>
            <Breadcrumbs
                breadCrumbTitle="Assign Inventory"
                breadCrumbParent="Inventory"
                breadCrumbActive="Assign Inventory"
            />
            <Card>
                <CardBody>
                    <FormGroup>
                        <div className='d-flex justify-content-between'>
                            <Label for='full-name'>Select Branch</Label>
                        </div>
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            name='item'
                            options={branchList}
                            onChange={(e) => setSelectedBranch(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <div className='d-flex justify-content-between'>
                            <Label for='full-name'>Select Item</Label>
                        </div>
                        <Select
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            name='item'
                            options={itemsList}
                            onChange={(e) => setSelectedItem(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Item Quantity*</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter Item Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="d-flex mb-0">
                        <Button.Ripple onClick={handleSubmit} className="mr-1" color="primary">
                            Submit
                        </Button.Ripple>
                        <Button.Ripple outline color="secondary" type="reset">
                            Reset
                        </Button.Ripple>
                    </FormGroup>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default AssignInventory
