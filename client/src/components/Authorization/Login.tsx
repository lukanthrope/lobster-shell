import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Spinner from '../../components/Spinner';
import { AuthContext } from '../../context/auth';
import HeaderContext from '../Header/HeaderContext';
import AuthLink from '../AuthLink';

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
        { (signin:Function, { loading }:any) => (
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
                <div className="m-t(20%)">
                  <h2>Log in</h2>
                  <Form className="m-t(20px) m-b(10px) d(flex) f-dir(col) Form">
                      { loading && <Spinner /> }
                      <label htmlFor="email">Email Address</label>
                      <Field 
                        className="o-line(none) bord(none) bord(bot) fs(1.1rem)" 
                        type="input" 
                        name="email" 
                        />
                      <div className="errorMes fs(0.8rem)">
                        <ErrorMessage name="email" />
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
                      { error && <div className="errorMes fs(0.8rem)">{error}</div> }
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
                          Log in
                      </button>
                  </Form>
                  <AuthLink 
                    haveAnAccount={false} 
                    redirect={hideAuthWindow} 
                    />
                </div>
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