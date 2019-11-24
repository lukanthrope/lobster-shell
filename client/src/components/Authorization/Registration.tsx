import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { AuthContext } from '../../context/auth';
import HeaderContext from '../Header/HeaderContext';

interface FormValues {
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
  checked: boolean,
}

const initialValues:FormValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  checked: false,
};

const Registration:React.FC = ({}) => {
  const context = React.useContext(AuthContext);
  const { login } = context;
  const hideAuthWindow = React.useContext<Function>(HeaderContext);

  return (
    <Mutation 
      mutation={REGISTER_USER} 
      onCompleted={(data:any) => {
        login(data.register);
        hideAuthWindow();
      }}>
        {(addUser:any, { loading }:any) => (
        <Formik 
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            addUser({ variables: values });
            if (!loading) {
              actions.setSubmitting(false);
            }
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email addresss`')
              .required('Required'),
            username: Yup.string()
              .min(3, 'Must be at least 3 characters')
              .required('Required'),
            password: Yup.string()
              .min(6, 'Must be 6 characters or more')
              .required('Required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            checked: Yup.bool()
              .oneOf([true], 'Please confirm the terms'),
          })}
          >
          {({ isSubmitting }) => (
            <Form>
              { loading && <p>loading..</p> }
              <label htmlFor="email">Email Address</label>
              <Field type="input" name="email" />
              <ErrorMessage name="email" />

              <label htmlFor="username">Username</label>
              <Field type="input" name="username" />
              <ErrorMessage name="username" />

              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field name="confirmPassword" type="password" />
              <ErrorMessage name="confirmPassword" />

              <label htmlFor="checked">I accept terms of the agreement</label>
              <Field name="checked" type="checkbox" />
              <ErrorMessage name="checked" />
              <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
          )}
          </Formik>
        )}
    </Mutation>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      username
      token
    }
  }
`;

export default Registration;