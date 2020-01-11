import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { AuthContext } from '../../context/auth';
import HeaderContext from '../Header/HeaderContext';
import AuthLink from '../AuthLink';

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
  const [emailError, setEmailError] = React.useState<string>(null);

  return (
    <Mutation 
      mutation={REGISTER_USER} 
      onCompleted={(data:any) => {
        login(data.register);
        hideAuthWindow();
      }}
      onError={() => setEmailError('email is already in use')}
      >
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
            validationSchema={
              Yup.object({
                email: Yup.string()
                  .email('Invalid email address')
                  .required('Required'),
                username: Yup.string()
                  .min(3, 'Must be at least 3 characters')
                  .required('Required'),
                password: Yup.string()
                  .min(6, 'Must be 6 characters or more')
                  .required('Required'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  .required('Passwords must match'),
                checked: Yup.bool()
                  .oneOf([true], 'Please confirm the terms'),
              })
            }
            >
              {({ isSubmitting, errors }) => (
                
                <div>
                  <h2 className="m-t(20%)">Sign up</h2>
                  <Form className="m-t(20px) m-b(10px) d(flex) f-dir(col) Form">
                    { loading && <p>loading..</p> }
                    <label htmlFor="email">Email Address</label>
                    <Field
                      className="o-line(none) bord(none) bord(bot) fs(1.1rem)" 
                      type="input" 
                      name="email" 
                      />
                    <div className="errorMes fs(0.8rem)">
                      <ErrorMessage name="email" />
                      {emailError}
                    </div>

                    <label className="m-t(10px)" htmlFor="username">Username</label>
                    <Field
                      className="o-line(none) bord(none) bord(bot) fs(1.1rem)" 
                      type="input" 
                      name="username" 
                      />
                    <div className="errorMes fs(0.8rem)">
                      <ErrorMessage name="username" />
                    </div>

                    <label className="m-t(10px)" htmlFor="password">Password</label>
                    <Field
                      className="o-line(none) bord(none) bord(bot) fs(1.1rem)" 
                      name="password" 
                      type="password" 
                      />
                    <div className="errorMes fs(0.8rem)">
                      <ErrorMessage name="password" />
                    </div>
                    <label className="m-t(10px)" htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                      className="o-line(none) bord(none) bord(bot) fs(1.1rem)" 
                      name="confirmPassword" 
                      type="password" 
                      />
                    <div className="errorMes fs(0.8rem)">
                      <ErrorMessage name="confirmPassword" />
                    </div>

                    <div className="d(in-flex) m-t(10px)">
                      <Field name="checked" type="checkbox" />
                      <label htmlFor="checked" className="fs(0.8rem)">I accept terms of the agreement</label>
                    </div>
                    <div className="errorMes fs(0.8rem)">
                        <ErrorMessage name="checked" />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="
                          m-t(20px) 
                          h(35px) 
                          submit 
                          bgc(l-pink) 
                          w(50%) 
                          bord(none) 
                          o-line(none) 
                          pointer 
                          col-h(white)
                          color(nrw) 
                          al-s(center)
                          shad(l-pink)
                          fs(1.1rem)"  
                      >
                        Submit
                    </button>
                  </Form>
                  <AuthLink 
                    haveAnAccount={true} 
                    redirect={hideAuthWindow} 
                    />
                </div>
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