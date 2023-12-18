import React, { useState } from "react";
import Modal from "react-modal";

const CustomModal = ({ modalIsOpen, setIsOpen, testCases, setTestCases }) => {
  let subtitle;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [eventChecked, setEventChecked] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault()
    const test = {
      isEvent: false,
      event: null,
      event_selector: null,
      what_selector_to_check: e.target.whichSelectorToCheck.value,
      what_to_check: e.target.whatToCheck.value,
    }
    if(e.target.eventChecked.checked){
      test.isEvent = true;
      test.event = e.target.eventSelect.value;
      test.event_selector = e.target.EventTriggeringSelector.value;
    }
    setTestCases([...testCases,test])

  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Test Case</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="checkbox"
            name="eventChecked"
            onChange={(e) => setEventChecked(e.target.checked)}
            checked={eventChecked}
          />{" "}
          Add event
          {eventChecked && (
            <div>
              Select Event:
              <select defaultValue="click" name="eventSelect" id="">
                <option value="click">click</option>
                <option value="dblclick">double click</option>
                <option value="mouseenter">mouse enter</option>
                <option value="mouseleave">mouse leave</option>
              </select>
              <div>
                Event triggering Selector: <input name="EventTriggeringSelector" type="text" />
              </div>
            </div>
          )}
          <div>
          What selector to check: <input name="whichSelectorToCheck" type="text"/>
          </div>
          <div>
          Which property to check: <input name="whatToCheck" type="text"/>
          </div>
          <button type="submit">Add Test Case</button>
        </form>
        <button onClick={() => setIsOpen(false)}>close</button>
      </Modal>
    </div>
  );
};

export default CustomModal;
