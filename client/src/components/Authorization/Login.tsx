import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { AuthContext } from '../../context/auth';
import HeaderContext from '../Header/HeaderContext';

interface FormValues {
  email: string,
  password: string,
}

const initialValues:FormValues = {
  email: '',
  password: '',
};

const Login:React.FC<{}> = () => {
  const context = React.useContext(AuthContext);
  const { login } = context;
  const hideAuthWindow = React.useContext<Function>(HeaderContext);
  const [error, setError] = React.useState<string>(null);

  return (
    <Mutation 
      mutation={LOGIN_USER} 
      onCompleted={(data:any) => {
        login(data.login);
        hideAuthWindow();
      }}
      onError={() => setError('wrong credencials')}
      >
        {(signin:any, { loading }:any) => (
          <Formik 
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              signin({ variables: values });
              if (!loading) {
                actions.setSubmitting(false);
              }
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email addresss`')
                .required('Required'),
              password: Yup.string()
                .min(6, 'Must be 6 characters or more')
                .required('Required'),
            })}
            >
              {({ isSubmitting }) => (
                <Form>
                  { loading && <p>loading..</p> }
                  <label htmlFor="email">Email Address</label>
                  <Field type="input" name="email" />
                  <ErrorMessage name="email" />
                  <label htmlFor="password">Password</label>
                  <Field name="password" type="password" />
                  <ErrorMessage name="password" />
                  {error && <>{error}</>}
                  <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
            )}
            </Formik>
        )}
      </Mutation>
  );
}

const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(email: $email password: $password) {
      username
      token
    }
  }
`;

export default Login;