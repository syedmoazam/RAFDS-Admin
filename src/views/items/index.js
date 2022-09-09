import { Fragment } from "react"

import * as yup from "yup"
import { Check } from "react-feather"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap"

import Avatar from "@components/avatar"
import Breadcrumbs from "@components/breadcrumbs"

const SuccessToast = ({ data }) => {
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size="sm" color="success" icon={<Check size={12} />} />
          <h6 className="toast-title">Item Added!</h6>
        </div>
      </div>
      <div className="toastify-body">
        <ul className="list-unstyled mb-0">
          <li>
            <strong>Item</strong>: {data?.name}
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

const AddItem = () => {
  const AddItemSchema = yup.object().shape({
    name: yup.string().required()
  })

  const { register, errors, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(AddItemSchema)
  })

  const onSubmit = (data) => {
    toast.success(<SuccessToast data={data} />, { hideProgressBar: true })
  }
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Add Items"
        breadCrumbParent="Items"
        breadCrumbActive="Add Item"
      />
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Items</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="name">Item Name*</Label>
              <Input
                id="name"
                name="name"
                innerRef={register({ required: true })}
                invalid={errors.name && true}
                placeholder="Enter Item Name"
              />
              {errors && errors.name && (
                <FormFeedback>{errors.name.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="d-flex mb-0">
              <Button.Ripple className="mr-1" color="primary" type="submit">
                Submit
              </Button.Ripple>
              <Button.Ripple outline color="secondary" type="reset">
                Reset
              </Button.Ripple>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default AddItem
