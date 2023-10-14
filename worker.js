let interval = null;

addEventListener("message", (message) => {
  if (message.data) {
    interval = setInterval(() => {
      postMessage("");
    }, 1000);
  } else {
    clearInterval(interval);
  }
});
