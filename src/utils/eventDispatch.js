const eventDispatch = (eventType,eventSelector,updatedDom) =>{
    var doubleClickEvent = new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window
      });
      updatedDom.querySelector(eventSelector).dispatchEvent(doubleClickEvent);
}

export default eventDispatch