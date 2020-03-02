import React from "react";
import Select from "react-select";
import { mapToOption, mapToOptions } from "../../../utils/mapToOptions";
import { isSetupNameValid } from "../../../utils/validators";

const NewSetupTopPanel = props => {
  const {
    setup,
    frames,
    handleNameChange,
    frameOnChange,
    saveSetupOnClick,
    deleteSetupOnClick,
    showValidationMessages
  } = props;

  return (
    <div className="d-flex flex-wrap">
      <div className="p-2 flex-fill">
        <label htmlFor="setupNameInput">Setup name</label>
        <input
          id="setupNameInput"
          type="text"
          className="form-control"
          value={setup.name}
          onChange={handleNameChange}
        />
        {showValidationMessages && !isSetupNameValid(setup.name) && (
          <small className="text-error">Name is required</small>
        )}
      </div>
      <div className="p-2 flex-fill select-dropdown">
        <label htmlFor="frameSelect">Frame</label>
        <Select
          id="frameSelect"
          defaultValue={mapToOption(setup.frame)}
          options={mapToOptions(frames)}
          onChange={e => frameOnChange(e.value)}
        />
      </div>
      <div className="p-2 flex-fill">
        <label htmlFor="frameSelect">Actions</label>
        <ul className="list-inline">
          <li className="list-inline-item">
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveSetupOnClick}
            >
              Save setup
            </button>
          </li>
          <li className="list-inline-item">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm("Are you sure?")) {
                  deleteSetupOnClick();
                }
              }}
            >
              Delete setup
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NewSetupTopPanel;
