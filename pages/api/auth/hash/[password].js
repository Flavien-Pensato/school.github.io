import bcrypt from 'bcryptjs';

const getBacon = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }

      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          reject(error);
        }
        resolve(hash);
      });
    });
  });

export default async function handler(req, res) {
  const {
    query: { password },
    method,
  } = req;

  try {
    switch (method) {
      case 'GET': {
        const hash = await getBacon(password);
        res.status(200).send(hash);
        break;
      }
      default:
        res.status(400).json({ success: false });
        break;
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
