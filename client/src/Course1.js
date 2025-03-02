import React, { useState, useEffect } from "react";
import Start from "./Start";
import End from "./End";
import Modal from "./Modal";
import Question from "./Question";
import quizData from "./data/quiz.json";
import ReactPlayer from "react-player";
import { multipleFilesUpload, singleFileUpload } from "../src/data/api";
import { getSingleFiles, getMultipleFiles, getFileById } from "./data/api";
import { useParams } from "react-router-dom";
let interval;
const Course1 = (props) => {
  let { id } = useParams();

  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState("");
  const [multipleFile, setMultipleFile] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);
  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };
  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };
  const [singleFile, setSingleFile] = useState();

  const getSingleFilesList = async () => {
    // usepara
    try {
      const fileslist = await getFileById(id);
      setSingleFile(fileslist);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleFilesList();
    getMultipleFilesList();
  }, []);

  const getMultipleFilesList = async () => {
    try {
      const fileslist = await getMultipleFiles();
      setMultipleFile(fileslist);
    } catch (error) {
      console.log(error);
    }
  };
  const singleFileChange = (e) => {
    setMultipleFiles(e.target.files[0]);
    // setMultipleProgress(0);
  };

  const UploadSingleFiles = async () => {
    const formData = new FormData();
    // formData.append("coursename", coursename);
    // formData.append("category", category);
    // formData.append("description", description);
    // formData.append("rating", rating);
    formData.append("file", multipleFiles);
    await multipleFilesUpload(formData);
    props.getSingle();
  };
  const renderDetails = (card, index) => {
    return (
      <div className="row">
        <div className="col">
          <img
            src={card.secure_url}
            style={{ width: "600px", height: "400px" }}
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col">
          <div className="card-body">
            <h5 className="card-title">
              <strong>{card.coursename}</strong>
            </h5>
            <p className="card-text ">
              {card.description}
              <br />
              <br />
              <strong> Category: </strong>
              {card.category}
              <br />
              <br />
              <strong> Duration :</strong> 3 Hours 30 minutes
              <br />
              <br />
              {/* <strong> Total Enrolled : </strong>456 students */}
              <br />
              <br />
              {/* <strong> Rating: </strong>{card.rating} */}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderVideo = (video, index) => {
    return (
      <div className="mx-2 my-3">
        <div className="col">
          <ReactPlayer
            height="240px"
            width="480px"
            controls 
            url={video.secure_url}
          />
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="container p-5">
        {singleFile && renderDetails(singleFile, singleFile._id)}
      </div>
      {/* <div className="container p-5 ">
        <div className="row">
          <div className="col">
            <img
              src="/Images/apqp.jfif" style={{width:"600px"},{height:"400px"}}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col">
            <div className="card-body">
              <h5 className="card-title">
                <strong>
                  ADVANCED PRODUCT QUALITY PLANNING PROGRAM (APQP)
                </strong>
              </h5>
              <p className="card-text ">
                Advanced Product Quality Planning or APQP is a quality framework
                used for developing new products in the automotive industry.
                Advanced Product Quality Planning can be applied to any
                industry. and its purpose is “To produce a product advanced
                quality planning which will support the development of a product
                or service that will satisfy to the customer.”
                <br />
                <br />
                <strong> Course By:</strong>
                <br />
                <br />
                <strong> Duration :</strong> 3 Hours 30 minutes
                <br />
                <br />
                <strong> Total Enrolled : </strong>456 students
                <br />
                <br />
                <strong> Rating: </strong>4.5/5
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="col-9 mt-4">
        <div className="form-group">
          <input
            type="file"
            onChange={(e) => singleFileChange(e)}
            className="form-control"
            multiple
          />
        </div>
      </div>

      <div className="row">
        <div className="col-10">
          <button
            type="button"
            onClick={() => UploadSingleFiles()}
            className="newCourseButton"
          >
            Create
          </button>
        </div>
      </div>

      <div className="row p-2">{multipleFile.map(renderVideo)}</div>
      {/* <div className="container ">
        <div className="row p-3">
          <div className="col  ">
            <p>
              <strong>Lesson 1</strong>
            </p>

            <div class="embed-responsive embed-responsive-16by9">
              <iframe
                class="embed-responsive-item"
                src="https://www.youtube.com/embed/_PYr6r7B8R4 "
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="col">
            <p>
              <strong>Lesson 2</strong>
            </p>
            <div class="embed-responsive embed-responsive-16by9">
              <iframe
                class="embed-responsive-item"
                src="https://www.youtube.com/embed/_PYr6r7B8R4"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="col">
            <p>
              <strong>Lesson 3</strong>
            </p>
            <div class="embed-responsive embed-responsive-16by9">
              <iframe
                class="embed-responsive-item"
                src="https://www.youtube.com/embed/_PYr6r7B8R4"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="row p-3">
          <div className="col  ">
            <p>
              <strong>Lesson 4</strong>
            </p>

            <div class="embed-responsive embed-responsive-16by9">
              <iframe
                class="embed-responsive-item"
                src="https://www.youtube.com/embed/_PYr6r7B8R4"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="col">
            <p>
              <strong>Lesson 5</strong>
            </p>
            <div class="embed-responsive embed-responsive-16by9">
              <iframe
                class="embed-responsive-item"
                src="https://www.youtube.com/embed/_PYr6r7B8R4"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="col">
            <p>
              <strong>Lesson 6</strong>
            </p>
            <div class="embed-responsive embed-responsive-16by9">
              <iframe
                class="embed-responsive-item"
                src="https://www.youtube.com/embed/_PYr6r7B8R4"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="container">
      <div className="list-group">
      <button type="button" className="list-group-item list-group-item-action active">Course Content </button>

        <button type="button" className="list-group-item list-group-item-action " aria-current="true">
          Introduction  <p className="float-end  "> </p>
        </button>
        <button type="button" className="list-group-item list-group-item-action">Lesson-1 <p className="float-end  ">< i className="fa fa-video fa-2x" />1 hour 30 minutes </p></button>
        <div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
</div>
        <button type="button" className="list-group-item list-group-item-action">Lesson-2 <p className="float-end  ">< i className="fa fa-video fa-2x" />1 hour 30 minutes </p></button>
        <div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
</div>
        <button type="button" className="list-group-item list-group-item-action">Lesson-3<p className="float-end  ">< i className="fa fa-video fa-2x" />1 hour 30 minutes </p></button>
        <div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
</div>
        <button type="button" className="list-group-item list-group-item-action" >Lesson-4<p className="float-end  ">< i className="fa fa-video fa-2x" />1 hour 30 minutes </p></button>
        <div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
</div>
      </div>
      
      </div> */}
      {/* <div className="container mt-3 mb-3">
        {step === 1 && <Start onQuizStart={quizStartHandler} />}
        {step === 2 && (
          <Question
            data={quizData.data[activeQuestion]}
            onAnswerUpdate={setAnswers}
            numberofQuestions={quizData.data.length}
            activeQuestion={activeQuestion}
            onSetActiveQuestion={setActiveQuestion}
            onSetStep={setStep}
          />
        )}
        {step === 3 && (
          <End
            results={answers}
            data={quizData.data}
            onReset={resetClickHandler}
            onAnswersCheck={() => setShowModel(true)}
            time={time}
          />
        )}

        {showModel && (
          <Modal
            onClose={() => setShowModel(false)}
            results={answers}
            data={quizData.data}
          />
        )}
      </div> */}
    </>
  );
};

export default Course1;
