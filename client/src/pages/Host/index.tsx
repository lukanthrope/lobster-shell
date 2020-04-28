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
  location: string;
}

const initialValues:FormInterface = {
  title: '',
  description: '',
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
        onCompleted={() => props.history.push('/')}
        onError={(error: any) => console.log(error)}
        >
          {(addPost:Function) => (
        <Formik 
          initialValues={initialValues}
          onSubmit={(values:FormInterface) => {
            addPost({ 
              variables: {
                title: values.title,
                description: values.description,
                locationName: values.location,
                lon: Number(coordinates.lon),
                lat: Number(coordinates.lat),
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
              .test('is-valid-url', 'invalid adress', (value: string) => 
                new Promise(resolve => {
                  isValidAdress(value)
                  .then((res:Coordinates):void => {
                    setCoordinates(res);
                    resolve(true);
                  })
                  .catch(():void => {
                    setCoordinates(null);
                    resolve(false);
                  });
                })),
          })}
          >
            {({ isSubmitting }) => (
              <div className="m(auto) w(30%) m-t-s()">
                { isSubmitting && <Spinner /> }
                <h1 className="font(logo) fs(3rem) p-s()">Be a host</h1>
                <Form className="m-t(30px) d(flex) f-dir(col) Form p-s()">
                    
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
    $locationName: String!
    $lon: Float
    $lat: Float
  ) {
    addPost(
      postInput: {
        title: $title
        description: $description
        pictures: $pictures
        panoramas: $panoramas
        locationName: $locationName
        lon: $lon
        lat: $lat   
      }
    )
  }
`;

export default Host;
