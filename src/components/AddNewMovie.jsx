import React, { useState } from "react";
import { Button, Modal, Rate, Input, message } from "antd";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import validator from "validator";

const AddNewMovie = ({ setMyMovies, clearFilterBtnState, setUnFiltered }) => {
  // initial value for objects to be added to myMovies
  const initialValue = {
    id: Math.random(),
    Title: "",
    Description: "",
    PosterURL: "",
    Rating: 0,
  };

  // set movieInfo state to the initial value declared above
  const [movieInfo, setMovieInfo] = useState(initialValue);

  // a function to handle input - when user types in or selects an input from the modal
  const handleInput = (event) => {
    // takes the event as a parameter
    const { id, value } = event.target; // destructures event target property to get an id and value.
    // the hook call below sets movieInfo by calling an anon fxn to rtn a new object of previous values created by spreading the previous value and appending new value
    setMovieInfo((preValue) => {
      return { ...preValue, [id]: value };
    });
  };

  // modal and messageholder states from antD
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    // when modal is open setState to True
    setIsModalOpen(true);
  };

  // function to handle OK button click
  const handleOk = () => {
    if (!validator.isURL(movieInfo.PosterURL)) {
      // validate poster url
      messageApi.open({
        type: "error",
        content: "Please provide a valid Image Address",
      });
      return;
    }
    if (validator.isEmpty(movieInfo.Title)) {
      // validate movie title
      messageApi.open({
        type: "error",
        content: "Please provide a Movie Title",
      });
      return;
    }

    if (validator.isEmpty(movieInfo.Description)) {
      // validate description
      messageApi.open({
        type: "error",
        content: "Please provide a Movie Description",
      });
      return;
    }

    if (movieInfo.Rating < 1) {
      // validate rating
      messageApi.open({
        type: "error",
        content: "Please Rate the Movie",
      });
      return;
    }
    messageApi.open({
      //display successful if all validations are passed
      type: "success",
      content: "Movie Sucessfully Added ",
    });

    setIsModalOpen(false); // update ModalOpen State
    setMyMovies((preValue) => [movieInfo, ...preValue]); //update mymovies array with info entered
    setUnFiltered((preValue) => [movieInfo, ...preValue]); // update unfiltered with movie info entered

    setMovieInfo(initialValue); // clear modal input
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* // hide add movie button if user is using filter */}
      {clearFilterBtnState ? null : (
        <Button
          type="primary"
          onClick={showModal}
          icon={<VideoCameraAddOutlined />}
        >
          Add Movie
        </Button>
      )}

      {contextHolder}

      {/* modal display */}
      <Modal
        title="Add New Movie"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="gap-4"
      >
        <div className="space-y-4">
          <Input
            placeholder="Title"
            id="Title"
            onChange={handleInput}
            value={movieInfo.Title}
          />
          <Input
            placeholder="Movie Poster URL"
            id="PosterURL"
            onChange={handleInput}
            value={movieInfo.PosterURL}
          />
          <Input.TextArea
            rows={4}
            onChange={handleInput}
            id="Description"
            value={movieInfo.Description}
          />
          <div className="shadow-md rounded-sm w-fit p-4 space-y-2">
            <p className="font-semibold">Movie Rating:</p>{" "}
            <Rate
              defaultValue={1}
              onChange={(value) =>
                setMovieInfo((preValue) => ({ ...preValue, Rating: value }))
              }
              value={movieInfo.Rating}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AddNewMovie;
