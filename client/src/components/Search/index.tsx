import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface Props {
  find: Function;
}

interface FormValues {
  searchField: string;
}

const initialValues:FormValues = {
  searchField: '',
}

const Search = ({ find }: Props) => 
  <Formik
    initialValues={ initialValues }
    onSubmit={ values => find({ 
      variables: { 
        offset: 0, 
        limit: 10, 
        request: values.searchField 
      },
      updateQuery: (prev:any, { fetchMoreResult }:any) => {
        console.log(fetchMoreResult)
        if (!fetchMoreResult) return null;
        return Object.assign({}, { getPosts: fetchMoreResult.getPosts})
      }
    })}
    validationSchema={
      Yup.object({
        searchField: Yup.string()
          .required('Required')
      })
    }
    >
      {({ isSubmitting }) => 
        <Form>
          <Field type="input" name="searchField" />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="
                m-t(20px) 
                h(35px) 
                submit 
                bgc(l-pink) 
                w(30px)
                bord(none) 
                o-line(none) 
                pointer 
                col-h(white)
                color(nrw) 
                al-s(center)
                
                fs(1.1rem)"  
            >
              <i className="material-icons">
                search
              </i>
          </button>
        </Form>
      }
  </Formik>
export default Search;