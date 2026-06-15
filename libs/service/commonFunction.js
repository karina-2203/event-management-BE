const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const calculateExpiryTime = () => {
  return new Date(Date.now() + 5 * 60 * 1000);
};
module.exports = { generateOTP, calculateExpiryTime };
