const customRespond = (payload, stt, msg) => {
  return payload.status(stt).json({ msg });
};
export default customRespond;
