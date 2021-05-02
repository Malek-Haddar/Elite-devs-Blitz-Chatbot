import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grow, Grid } from "@material-ui/core";
import { selectcourses, getCourses } from "store/CoursesSlice";
import Courses from "components/courses/Courses";
import Header from "components/headers/light";
import Footer from "components/footers/SimpleFooter";
import axios from "axios";
import AdminCourse from "components/adminCourse/AdminCourse";
import { Drawer, Button } from "antd";
import { connect } from "react-redux";
//import "antd/dist/antd.css";
function CoursesHome({ auth }) {
  const [setCurrentId] = useState(null);
  const [TriField, setTriField] = useState({
    name: "default",
  });
  const dispatch = useDispatch();
  const [adminCourse, setAdminCourse] = useState([]);
  const courses = useSelector(selectcourses);
  const [id, setId] = useState("id");
  const [data, setData] = useState([]);
  const [courseEnrolled, setcourseEnrolled] = useState();
  const [state, setState] = useState({ visible: false, childrenDrawer: false });
  const [flag, setFlag] = useState(false);
  const [Udemyflag, setUdemyflag] = useState(false);
  const [udemy, setUdemy] = useState();
  const [FilterFlag, setFilterFlag] = useState(false);
  const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const onClose = () => {
    setState({
      visible: false,
    });
  };

  useEffect(() => {
    dispatch(getCourses());
    require("antd/dist/antd.css");
    return () => {
      window.location.reload();
    };
  }, []);
  useEffect(() => {
    if (TriField.name !== "default") {
      if (TriField.name === "Front End") {
        axios
          .get(`http://localhost:5000/blitzcourse/field`)
          .then(function (response) {
            console.log("fel filter");
            setFilterFlag(true)
            setAdminCourse(response.data);
            
          });
      } else if (TriField.name === "MostFrequent") {
        console.log("most frequent");
      }
    } else {
      console.log("else");
    }
  }, [TriField]);
  useEffect(() => {
    if(!FilterFlag){
    axios.get("http://localhost:5000/allcourses").then(function (response) {
      setAdminCourse(response.data);
    });}
  }, []);

  useEffect(() => {
    if (id !== "id" && id !== undefined) {
      console.log("id in 1 : " + id);
      axios.get(`http://localhost:5000/blitzcourse/${id}`).then(function (response) {
        setData(response.data);
      });
      showDrawer();
    }
  }, [id]);
  const Actionenroll = (data) => {
    setcourseEnrolled(data);
    console.log(data);
    setFlag(true);
  };

  useEffect(() => {
    if (flag) {
      console.log("id course: " + courseEnrolled._id);
      console.log("id user : " + auth.user._id);
      axios.put(`http://localhost:5000/enroll/${auth.user._id}/${courseEnrolled._id}`);
      axios.post("http://localhost:5000/addUdemy", courseEnrolled);
    }
    console.log(courseEnrolled);
  }, [flag]);

  useEffect(() => {
    //
    console.log(udemy);
    setUdemyflag(true);
  }, [udemy]);
  // useEffect(() => {
  //   if (Udemyflag) {
  //     axios.put(`http://localhost:5000/enroll/${auth.user._id}`, { udemy: udemy }).then((result) => console.log("UDEMyyyy : ", udemy));
  //   }
  // }, [udemy]);
  return (
    <>
      <Header />

      <Drawer width={800} closable={false} onClose={onClose} visible={state.visible}>
        <h1 style={{ textAlign: "center" }}>{data.title}</h1>
        <br />
        <h2>Course Description</h2>
        <p style={{ marginLeft: "30px" }}>{data.description}</p>
        <h2>Course Field</h2>
        <p style={{ marginLeft: "30px" }}>{data.field}</p>
        <Button onClick={() => Actionenroll(data)} style={{ width: "200px", textAlign: "center", marginLeft: "250px" }}>
          Enroll
        </Button>
      </Drawer>
      <Grow in>
        <Grid
          style={{
            backgroundColor: "rgb(214, 214, 214)",
            paddingLeft: "200px",
            paddingRight: "200px",
          }}
        >
          <br></br>
          <Courses setUdemy={setUdemy} courses={courses} setCurrentId={setCurrentId} auth={auth} />
          <AdminCourse setcourseEnrolled={setcourseEnrolled} setId={setId} courseData={adminCourse} />
          <br />
          <br />
        </Grid>
      </Grow>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CoursesHome);
