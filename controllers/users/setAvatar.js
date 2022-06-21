const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { User } = require('../../models/user');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const setAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tmpUpload, filename } = req.file;

  try {
    const image = await Jimp.read(tmpUpload);
    await image.resize(250, 250).quality(80).writeAsync(tmpUpload);

    const [extension] = filename.split('.').reverse();
    const newFileName = `${_id}.${extension}`;
    const resultUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join('avatars', newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = setAvatar;
