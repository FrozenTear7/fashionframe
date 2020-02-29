import React from "react";

const NewSetupDescription = props => {
  const { description, handleDescriptionChange, screenshotFileRef } = props;

  return (
    <div>
      <div className="form-group">
        <label htmlFor="descriptionTextarea">Description</label>
        <textarea
          id="descriptionTextarea"
          className="form-control"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>

      <br />
      <div className="form-group">
        <label htmlFor="screenshotInput">Screenshot</label>
        <input
          id="screenshotInput"
          type="file"
          className="form-control-file"
          accept=".jpg,.png"
          ref={screenshotFileRef}
        />
      </div>
    </div>
  );
};

export default NewSetupDescription;
