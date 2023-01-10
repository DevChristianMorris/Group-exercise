const formatChirp = (chirp) => {
  return {
    id: chirp._id,
    text: chirp.text,
    createdDate: chirp.createdDate,
    username: chirp.username,
    avatar: chirp.avatar,
  };
};

module.exports = formatChirp;
