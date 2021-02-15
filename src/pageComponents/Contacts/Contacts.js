import React, { useState, useEffect } from 'react';
import ContactsForm from './ContactsForm'
import ContactsTable from './ContactsTable'
import { projectDB } from '../../firebase/Config'
import { jumbotronStyle } from '../../style/style.js'
import IosAddCircleOutline from 'react-ionicons/lib/IosAddCircleOutline'
import IosHammerOutline from 'react-ionicons/lib/IosHammerOutline'
import { Jumbotron, Button } from 'react-bootstrap'

const Contacts = ({ currentUser }) => {
  const [contactsObj, setContactsObj] = useState({})
  const [currentID, setCurrentId] = useState('')
  const [page, setPage] = useState('Table')

  useEffect(() => {
    
    projectDB.child('contacts').on('value', snapshot => {
      if(snapshot.val() != null) {
        setContactsObj({
          ...snapshot.val()
        })
      }
      else {
        setContactsObj({})
      }
    })
  },[])

  
  const addOrEdit = (obj) => {
    if(currentID === '') {
      projectDB.child('contacts').push(
        obj,
        error => {
          if(error) {
            console.log(error)
          }
          else {
            setCurrentId('')
          }
        }
      )
    }
    else {
      projectDB.child(`contacts/${currentID}`).set(
        obj,
        error => {
          if(error) {
            console.log(error)
          }
          else {
            setCurrentId('')
          }
        }
      )
    }
  }

  
  const deleteId = (key) => {
    if(window.confirm('Are you sure to delete it?')){
      projectDB.child(`contacts/${key}`).remove(
        error => {
          if(error) {
            console.log(error)
          }
          else {
            setCurrentId('')
          }
        }
      )
    }
  }

  return (
    <>
      <Jumbotron style={jumbotronStyle} md={12} lg={12} xl={12} className='m-4'>
        <h1 className='mb-5'>Notes</h1>
       
        <Button className='m-2' variant="outline-info"
          style={{border: 'none'}}
          disabled={page === 'Form'}
          onClick={() => setPage('Form')}
          title={currentID === '' ? 'Add New' : 'Edit'}>
          { currentID === '' ?
            <IosAddCircleOutline fontSize='30px' /> :
            <IosHammerOutline fontSize='30px' />
          }
        </Button>
        { page === 'Table' ?
          <ContactsTable contactsObj={contactsObj} setCurrentId={setCurrentId} deleteId={deleteId} setPage={setPage} /> :
          <>
            <ContactsForm {...({ addOrEdit, currentID, contactsObj })} setPage={setPage} />
            <ContactsTable contactsObj={contactsObj} setCurrentId={setCurrentId} deleteId={deleteId} setPage={setPage} />
          </>
        }
      </Jumbotron>
    </>
  )
}

export default Contacts
