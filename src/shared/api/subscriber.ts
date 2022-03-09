export const subscriber = (method) => (api) => ({
  fetch() {
    api.send(method);
  },
  changed(cb) {
    api.on(method, (value) => {
      cb(value);
    });
  },
});
