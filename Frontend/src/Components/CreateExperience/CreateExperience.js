import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./CreateExperience.module.css";
import Card from "./Card/Card";
import { Navbar } from "../LandingPage/Navbar/Navbar"
import { Footer } from "../LandingPage/Footer/Footer"
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";

const CreateExperience = () => {
  const { user } = useContext(AuthContext);
  // const [data, setData] = useState({
  //   title: "",
  //   city: "",
  //   description: "",
  //   photo: "",
  // });
  // let name, value;
  // const handleInputs = (e) => {
  //   name = e.target.name;
  //   value = e.target.value;
  //   setData({ ...data, [name]: value });
  // };
  // const uploadImage = (e) => {
  //   e.preventDefault();
  //   setData({ ...data, photo: e.target.files });
  //   console.log(e.target.files);
  // };

  // const PostData = async (e) => {
  //   e.preventDefault();
  //   const fd = new FormData();
  //   fd.append("title", data.title);
  //   fd.append("city", data.city);
  //   fd.append("description", data.description);
  //   fd.append("photo", data.photo);



  //   // const { title,city,description,photo} = fd;
  //   // if (!title) {
  //   //   alert("First fill the required fields");
  //   // } 
  //   //  else {
  //     const res = await axios
  //       .post("/dest/destination", fd)
  //       .then((res) => {
  //         console.log(res);

  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     // }

  // };
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImage] = useState([]);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  }

  const cityHandler = (e) => {
    setCity(e.target.value);
  }

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  }

  const imageHandler = (e) => {
    setImage(e.target.files);
  }

  // const [imageObjArr, setImageObjArr] = useState([]);
  let imageObjArr = []

  const PostData = async (e) => {
    e.preventDefault();

    if (!title || !city || !description) {
      alert("Title, city and description are required");
    }  else {
      try {
        const imageUploadData = new FormData();
        const url = "https://api.cloudinary.com/v1_1/travellers-scout/image/upload";
        for (let image of images) {
          imageUploadData.append("file", image);
          imageUploadData.append("upload_preset", "dsw0nskq");

          await fetch(url, {
            method: "POST",
            body: imageUploadData
          }).then((response) => {
            return response.json();
          // eslint-disable-next-line no-loop-func
          }).then(data => {
           
            const imgData = {
              url: data.url,
              filename: data.original_filename
            }
            
            imageObjArr.push(imgData);
            // console.log(imageObjArr)

          })
        }
      } catch (err) {
        console.log(err)
      } finally{

        const formData = new FormData();
        const data = {title, city, description}
        
        for(const name in data) {
          formData.append(name, data[name]);
        }

        for(let i=0; i<imageObjArr.length; i++){
          // console.log(imageObjArr[i])
          const imageObjString = `${imageObjArr[i].url}--wesplithere--${imageObjArr[i].filename}`
          // JSON.stringify(imageObjArr[i])
          formData.append('images[]', imageObjString);
        }

        // console.log(formData);
        
        let dataPostUrl = "http://localhost:5000/api/v1/destinations/destination"

        const response = await axios.post(dataPostUrl,formData)
        .then((res)=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })

      }

    
    }

  }

  return (

    <>

      <Navbar />

      <div style={{ marginTop: "70px" }}>
        <Card className={classes.background}>
          <div className="row my-3">
            <h1 className={"text-center mb-4 " + classes.heading}>
              Add a new travel experience
            </h1>
            <div className="col-md-9 mx-auto">
              <form onSubmit={PostData}>
                <div className="mb-3">
                  <label className={"form-label " + classes.labelStyle} htmlFor="title">
                    Name of Destination
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    name="title"
                    onChange={titleHandler}
                    value={title}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className={"form-label " + classes.labelStyle} htmlFor="city">
                    City
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="city"
                    name="city"
                    onChange={cityHandler}
                    value={city}
                    required
                  />
                </div>



                <div className="mb-3">
                  <label
                    className={"form-label " + classes.labelStyle}
                    htmlFor="description"
                  >
                    Write your experience
                  </label>
                  <textarea
                    className="form-control"
                    type="text"
                    id="description"
                    name="description"
                    onChange={descriptionHandler}
                    value={description}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choose-files"
                    className={"form-label " + classes.labelStyle}
                  >
                    Add Images
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    alt="Picture of a destination"
                    name="photo"
                    onChange={imageHandler}
                    accept="image/*"
                    multiple
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-success" >
                    Share your experience
                  </button>
                </div>
              </form>
              <NavLink to="/">Back to Landing</NavLink>
            </div>
          </div>
        </Card>


      </div>

      <Footer />

    </>
  );
};

export default CreateExperience;
