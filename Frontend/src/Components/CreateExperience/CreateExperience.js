import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./CreateExperience.module.css";
import Card from "./Card/Card";
import {Navbar} from "../LandingPage/Navbar/Navbar"
import {Footer} from "../LandingPage/Footer/Footer"
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";

const CreateExperience = () => {
  const {user} = useContext(AuthContext);
  const [data, setData] = useState({
    title: "",
    city: "",
    description: "",
    photo: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const uploadImage = (e) => {
    e.preventDefault();
    setData({ ...data, photo: e.target.files });
    console.log(e.target.files);
  };

  const PostData = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", data.title);
    fd.append("city", data.city);
    fd.append("description", data.description);
    fd.append("photo", data.photo);
    


    // const { title,city,description,photo} = fd;
    // if (!title) {
    //   alert("First fill the required fields");
    // } 
    //  else {
      const res = await axios
        .post("/dest/destination", fd)
        .then((res) => {
          console.log(res);
          
        })
        .catch((err) => {
          console.log(err);
        });
      // }

  };

  return (
   
    <>
    
    <Navbar/>

    <div style={{marginTop:"70px"}}>
    <Card className={classes.background}>
      <div className="row my-3">
        <h1 className={"text-center mb-4 " + classes.heading}>
          Add a new travel experience
        </h1>
        <div className="col-md-9 mx-auto">
          <form>
            <div className="mb-3">
              <label className={"form-label " + classes.labelStyle} for="title">
                Name of Destination
              </label>
              <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                onChange={handleInputs}
                value={data.title}
                required
              />
            </div>
            <div className="mb-3">
              <label className={"form-label " + classes.labelStyle} for="city">
                City
              </label>
              <input
                className="form-control"
                type="text"
                id="city"
                name="city"
                onChange={handleInputs}
                value={data.city}
                required
              />
            </div>



            <div className="mb-3">
              <label
                className={"form-label " + classes.labelStyle}
                for="description"
              >
                Write your experience
              </label>
              <textarea
                className="form-control"
                type="text"
                id="description"
                name="description"
                onChange={handleInputs}
                value={data.description}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label
                for="choose-files"
                className={"form-label " + classes.labelStyle}
              >
                Add Images
              </label>
              <input
                className="form-control"
                type="file"
                alt="Picture of a destination"
                name="photo"
                onChange={uploadImage}
                accept="image/*"
                multiple
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-success" onClick={PostData}>
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
