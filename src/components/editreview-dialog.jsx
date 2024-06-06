import "../styles/dialog.css";
import React, { useState } from "react";

const EditDialog = (props) => {
  const [inputs, setInputs] = useState({
    _id: props._id,
    reviewer: props.reviewer,
    content: props.content,
    rating: props.rating,
    item: props.item,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Editing review...");
    const formData = new FormData(event.target);

    /* TODO: Change to formal server link */
    const response = await fetch(
      `https://pixel-renaissance-server.onrender.com/api/reviews/${props._id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (response.status === 200) {
      setResult("Review successfully updated!");
      event.target.reset();
      props.editReview(await response.json());
      setTimeout(function () {
        setResult("");
      }, 5000);
      props.closeDialog();
    } else {
      console.log("There was an error updating your review", response);
      setResult(response.message);
    }
  };

  return (
    <div id="edit-dialog" className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            id="dialog-close"
            className="w3-button w3-display-topright"
            onClick={props.closeDialog}
          >
            &times;
          </span>
          <form id="edit-review-form" onSubmit={onSubmit}>
            <div id="review-part">
              <label htmlFor="reviewer">Name: </label>
              <input
                type="text"
                id="reviewer"
                name="reviewer"
                value={inputs.reviewer || ""}
                onChange={handleChange}
                required
                minLength="3"
              />
            </div>
            <div id="review-part">
              <label htmlFor="content">Review: </label>
              <textarea
                type="text"
                id="content"
                name="content"
                value={inputs.content || ""}
                onChange={handleChange}
                required
                minLength="3"
              />
            </div>
            <div id="product-dropdown">
              <label htmlFor="item">Product: </label>
              <select
                name="item"
                value={inputs.item || ""}
                onChange={handleChange}
              >
                <option value="stickers">Stickers</option>
                <option value="mug">Mug</option>
                <option value="pin">Pin</option>
              </select>
            </div>
            <div id="rating-dropdown">
              <label htmlFor="rating">Rating: </label>
              <select
                type="number"
                name="rating"
                value={parseFloat(inputs.rating) || ""}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
                <option value="3.5">3.5</option>
                <option value="4">4</option>
                <option value="4.5">4.5</option>
                <option value="5">5</option>
              </select>
            </div>

            <div id="review-button-box">
              <button type="submit" id="btn-review">
                Submit Review
              </button>
            </div>
            <p id="result">{result}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;
