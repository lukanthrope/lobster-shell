import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { RouteComponentProps } from 'react-router';
import { History, LocationState } from "history";

import { AuthContext } from '../../context/auth';
import { Coordinates, isValidAdress } from '../../utils/maps';
import ImageUpload from '../../components/ImageUpload';
import Spinner from '../../components/Spinner';

interface Props extends RouteComponentProps {
  history: History<LocationState>;
}

interface FormInterface {
  title: string;
  description: string;
  price: number;
  location: string;
}

const initialValues:FormInterface = {
  title: '',
  description: '',
  price: 0,
  location: '',
}

const Host = (props: Props) => {
  const [imageFiles, setImageFiles] = React.useState<HTMLInputElement[]>([]);
  const [imageURLs, setImageURLs] = React.useState<string[]>([]);
  const [panoramFiles, setPanoramFiles] = React.useState<HTMLInputElement[]>([]);
  const [panoramURLs, setPanoramURLs] = React.useState<string[]>([]);

  const [coordinates, setCoordinates] = React.useState<Coordinates>({ lon: null, lat: null });
  const PHOTO_LABEL_CLASES:string = `pointer pos(r) t-al(center) m-t(20px) h(35px) submit bgc(l-pink) 
                                    w(50%) bord(none) o-line(none) pointer col-h(white) color(nrw) 
                                    al-s(center) shad(l-pink) fs(1.1rem)`;

  const authContext = React.useContext(AuthContext);
  const { user } = authContext;

  React.useEffect(() => {
    if (!user)
      props.history.push('/');  
  }, []);

  const handleImageChange = (e:any, isPanoram:boolean):void => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      const csv: string = reader.result as string;
      if (isPanoram) {
        setPanoramFiles([... panoramFiles, file]);
        setPanoramURLs([...panoramURLs, csv]);
      } else {
        setImageFiles([...imageFiles, file]);
        setImageURLs([...imageURLs, csv]);
      }
    }
  
    reader.readAsDataURL(file);
  }

  const delFilter = (arr:any[], index: number):any[] =>
    arr.filter((_, i) => index !== i);

  const removeImage = (index:number, isPanoram:boolean):void => {
    if (isPanoram) {
      setPanoramURLs(delFilter(panoramURLs, index));
      setPanoramFiles(delFilter(panoramFiles, index));
    } else {
      setImageURLs(delFilter(imageURLs, index));
      setImageFiles(delFilter(imageFiles, index));
    }
  }

  return (
    <div className="m-t(10%) w(100%)">
      <Mutation 
        mutation={ADD_POST} 
        onCompleted={(data: any) => console.log(data)}
        onError={(error: any) => console.log(error)}
        >
          {(addPost:Function, { loading }:any) => (
        <Formik 
          initialValues={initialValues}
          onSubmit={(values:FormInterface) => {
            addPost({ 
              variables: {
                title: values.title,
                description: values.description,
                price: values.price,
                locationName: values.location,
                lon: coordinates.lon,
                lat: coordinates.lat,
                pictures: imageFiles, 
                panoramas: panoramFiles,
              }
            });
          }}
          validationSchema={Yup.object({
            title: Yup.string()
              .required('Required'),
            location: Yup.string()
              .required('Required')
              .test('is-valid-url', 'invalid adress', (value: string):boolean => {
                isValidAdress(value)
                  .then((res:Coordinates):void => {
                    setCoordinates(res);
                  })
                  .catch(():void => {
                    setCoordinates(null);
                  });
                  return true;
              }),
          })}
          >
            {({ isSubmitting }) => (
              <div className="m(auto) w(30%)">
                { isSubmitting && <Spinner /> }
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
                      type="number" 
                      min="0"
                      />
                    <div className="errorMes fs(0.6rem)">
                      <ErrorMessage name="price" />
                    </div>
                    <label className="m-t(10px)" htmlFor="description">Description:</label>
                    <Field
                      className="o-line(none) bord(none) bord(bot) m-t(10px) fs(1.1rem)" 
                      name="description" 
                      as="textarea" 
                      />
                    <div className="errorMes fs(0.6rem)">
                      <ErrorMessage name="description" />
                    </div>

                    <ImageUpload 
                      classes={PHOTO_LABEL_CLASES} 
                      callback={handleImageChange} 
                      delImage={removeImage}
                      images={imageURLs}
                      />
                    <ImageUpload 
                      title="Upload panoramas"
                      classes={PHOTO_LABEL_CLASES} 
                      callback={handleImageChange} 
                      delImage={removeImage}
                      images={panoramURLs}
                      isPanoram={true}
                      />

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
          )}
      </Mutation>
    </div>
  )
};

const ADD_POST = gql`
  mutation addPost(
    $title: String!
    $description: String
    $pictures: [Upload]
    $panoramas: [Upload]
    $price: Float
    $locationName: String!
    $lon: String
    $lat: String
  ) {
    addPost(
      postInput: {
        title: $title
        description: $description
        pictures: $pictures
        panoramas: $panoramas
        price: $price
        locationName: $locationName
        lon: $lon
        lat: $lat   
      }
    )
  }
`;

export default Host;
