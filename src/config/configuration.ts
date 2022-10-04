export default () => {
  return {
    sender: {
      email: process.env.EMAIL,
      pass: process.env.PASS,
    },
    recipient: {
      email: process.env.RECIPIENT_EMAIL,
    },
  };
};
