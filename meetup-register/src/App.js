import './App.css';
import React, {useEffect} from 'react';
import {ApolloClient, ApolloProvider, gql, InMemoryCache, useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {Field, Form} from 'react-final-form'

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache()
});

const QUERY = gql`
    mutation($email: String!, $password: String!, $firstName: String!, $lastName: String!, $status: String!) {
        signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName, status: $status) {
            user {
                id
            }
        }
    }
`


function App() {
    return (
        <ApolloProvider client={client}>
            <Data/>
        </ApolloProvider>
    );
}

const Data = () => {
    return (
        <MyForm/>
    )
}

const EMAIL = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const PASS = /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"/

const MyForm = () => {
    const onSubmit = ({email, firstName, lastName, password}) => {
        call({variables: {status: 'OWNER', email, firstName, lastName, password}})
    }
    const validate = ({email, firstName, lastName, password}) => {
        const errors = {}
        if(!email){
            errors.email = 'Required'
        } else {
            if(!EMAIL.test(email)){
                errors.email = 'Please enter a valid email address'
            }
        }
        if(!password){
            errors.password = 'Required'
        }
        if(!firstName){
            errors.firstName = 'Required'
        }
        if(!lastName){
            errors.lastName = 'Required'
        }
        return errors
    }
    const [call, {data, error, loading, called}] = useMutation(QUERY)
    useEffect(()=>{
        //
    }, [])
    console.log({data, error, loading, called})
    // const encrypt = sha256(process.env.REACT_APP_APP_SECRET)
    return (<Form
        onSubmit={onSubmit}
        validate={validate}
        render={({handleSubmit, pristine, submitting, hasValidationErrors, hasSubmitErrors, valid, errors: {errors}}) => (
            <form onSubmit={handleSubmit}>
                <h2>Register Admin</h2>
                <div>
                    <label>Email</label>
                    <Field name="email" component={FieldInput} placeholder="First Name"/>
                </div>
                <div>
                    <label>Password</label>
                    <Field name="password" type={'password'} component={FieldInput} placeholder="password"/>
                </div>
                <div>
                    <label>First Name</label>
                    <Field name="firstName" component={FieldInput} placeholder="First Name"/>
                </div>

                <div>
                    <label>Last Name</label>
                    <Field name="lastName" component={FieldInput} placeholder="Last Name"/>
                </div>
                <button type="submit">Submit</button>
            </form>
        )}
    />)
}


export const FieldInput = ({input, meta: {touched, error, submitFailed, modifiedSinceLastSubmit,dirtySinceLastSubmit, ...meta}, disabled, placeholder, autoComplete, onBlur}) => {
    console.log(dirtySinceLastSubmit)
    return (
        <div>
            <input
                {...input}
                disabled={disabled}
                error={touched && error}
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
            {error && submitFailed && !dirtySinceLastSubmit && <p>{error}</p>}
        </div>
    )
}

export default App
