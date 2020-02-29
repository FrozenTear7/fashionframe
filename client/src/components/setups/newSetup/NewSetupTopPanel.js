import React from "react";
import Select from "react-select";
import { mapToOption, mapToOptions } from "../../../utils/mapToOptions";

const NewSetupTopPanel = props => {
  const {
    setup,
    frames,
    handleNameChange,
    frameOnChange,
    saveSetupOnClick,
    deleteSetupOnClick
  } = props;

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="setupNameInput">Setup name</label>
            <input
              id="setupNameInput"
              type="text"
              className="form-control"
              value={setup.name}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="frameSelect">Frame</label>
            <Select
              id="frameSelect"
              defaultValue={mapToOption(setup.frame)}
              options={mapToOptions(frames)}
              onChange={e => frameOnChange(e.value)}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="form-group">
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
      </div>
    </div>
  );
};

export default NewSetupTopPanel;
