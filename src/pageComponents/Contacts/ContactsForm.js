import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'

const ContactsForm = ({ addOrEdit, currentID, contactsObj, setPage }) => {
  const initialFieldValues = {
    address: ''
  }
  const [values, setValues] = useState(initialFieldValues)

  useEffect(() => {
    if(currentID === '') {
      setValues({
        ...initialFieldValues
      })
    }
    else {
      setValues({
        ...contactsObj[currentID]
      })
    }
  },[currentID, contactsObj])

  const handlerInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handlerFormSubmit = (e) => {
    e.preventDefault()
    addOrEdit(values)
    setPage('Table')
  }

  return (
    <Form className='my-2' onSubmit={handlerFormSubmit}>
     
        

      <Form.Group controlId='formAddress'>
        <Form.Label>Address:</Form.Label>
        <textarea
          className='form-control'
          placeholder={currentID === '' ? 'Input New notes' : 'Update notes'}
          name='address'
          value={values.address}
          onChange={handlerInputChange} />
      </Form.Group>
      <Button
        variant="primary" 
        type="submit"
        title={currentID === '' ? 'Submit' : 'Update'}>
        {currentID === '' ? 'Submit' : 'Update'}
      </Button>
    </Form>
  )
}

export default ContactsForm
