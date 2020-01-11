import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { RouteComponentProps } from 'react-router';
import { History, LocationState } from "history";

import { AuthContext } from '../../context/auth';

interface Props extends RouteComponentProps {
  history: History<LocationState>;
}

interface FormInterface {
  title: string;
  description: string;
  price: number;
  pictures: any[];
  location: string;
}

const initialValues:FormInterface = {
  title: '',
  description: '',
  price: null,
  pictures: [],
  location: '',
}

const Host = (props: Props) => {
  const authContext = React.useContext(AuthContext);
  const { user } = authContext;

  React.useEffect(() => {
    if (!user)
      props.history.push('/');  
  }, [])

  return (
    <div className="m-t(10%) w(100%)">
      
      <Formik 
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              
            }}
            validationSchema={Yup.object({
              title: Yup.string()
                .required('Required'),
              location: Yup.string()
                .required('Required'),
              description: Yup.string()
                .required('Required'),
            })}
            >
              {({ isSubmitting }) => (
                <div className="m(auto) w(30%)">
                  <h2 className="font(logo)">Be a host</h2>
                  <Form className="m-t(30px) d(flex) f-dir(col) Form">
                      
                      <label htmlFor="title">Title</label>
                      <Field 
                        className="o-line(none) bord(none) bord(bot) fs(1.1rem)" 
                        type="input" 
                        name="title" 
                        />
                      <div className="errorMes fs(0.6rem)">
                        <ErrorMessage name="title" />
                      </div>
                      <label className="m-t(10px)" htmlFor="location">Location</label>
                      <Field
                        className="o-line(none) bord(none) bord(bot) fs(1.1rem)" 
                        name="location" 
                        type="input" 
                        />
                      <div className="errorMes fs(0.6rem)">
                        <ErrorMessage name="location" />
                      </div>
                      <label className="m-t(10px)" htmlFor="price">Price</label>
                      <Field
                        className="o-line(none) bord(none) bord(bot) fs(1.1rem)" 
                        name="price" 
                        type="input" 
                        placeholder="free"
                        />
                      <div className="errorMes fs(0.6rem)">
                        <ErrorMessage name="price" />
                      </div>
                      <label className="m-t(10px)" htmlFor="description">Description:</label>
                      <Field
                        className="o-line(none) bord(none) bord(bot) m-t(10px) fs(1.1rem)" 
                        name="description" 
                        type="textarea"
                        as="textarea" 
                        />
                      <div className="errorMes fs(0.6rem)">
                        <ErrorMessage name="description" />
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
                </div>
            )}
            </Formik>
    </div>
  )
};

/*const ADD_POST = gql`
  mutation addPost(

  )
`;
*/

export default Host;