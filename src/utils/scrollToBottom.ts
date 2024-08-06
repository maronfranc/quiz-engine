function scrollToBottom() {
  if (window && document) {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }
}

export default scrollToBottom;
