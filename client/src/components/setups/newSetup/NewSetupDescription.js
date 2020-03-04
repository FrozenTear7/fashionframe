import React from "react";
import { isSetupDescriptionValid } from "../../../utils/validators.js";

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
        {showValidationMessages && !isSetupDescriptionValid(description) && (
          <small className="text-error">Max length: 500</small>
        )}
      </div>
      <br />
      <div>
        <h5>Upload new photo:</h5>
        <br />
        <input
          id="screenshotInput"
          type="file"
          className="form-control-file"
          accept=".jpg,.png"
          ref={screenshotFileRef}
        />
        <br />
        {screenshot && (
          <div>
            Current screenshot
            <img
              src={screenshot}
              alt="Thumbnail"
              className="search-thumbnail"
            />
          </div>
        )}
        {showValidationMessages && !screenshotFileRef.current.files[0] && (
          <small className="text-error">Setup image is required</small>
        )}
      </div>
    </div>
  );
};

export default NewSetupDescription;
