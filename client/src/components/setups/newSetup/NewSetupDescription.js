import React from "react";

const NewSetupDescription = props => {
  const {
    description,
    screenshot,
    handleDescriptionChange,
    screenshotFileRef,
    showValidationMessages
  } = props;

  return (
    <div>
      <div>
        <label htmlFor="descriptionTextarea">Description</label>
        <textarea
          id="descriptionTextarea"
          className="form-control description-textarea"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <br />
      <div>
        <label htmlFor="screenshotInput">Screenshot</label>
        {screenshot && (
          <div>
            <img
              src={screenshot}
              alt="Thumbnail"
              className="search-thumbnail"
            />
            <br />
            <h5>Upload new photo:</h5>
            <br />
          </div>
        )}
        <input
          id="screenshotInput"
          type="file"
          className="form-control-file"
          accept=".jpg,.png"
          ref={screenshotFileRef}
        />
        {showValidationMessages && !screenshotFileRef.current.files[0] && (
          <small className="text-error">Setup image is required</small>
        )}
      </div>
    </div>
  );
};

export default NewSetupDescription;
