import crypto from "crypto";

const hashPassword = (password: string): string => {
  // return crypto.createHmac('sha256', process.env.PASSWORD_HASH_STRING || 'secret!').update(password).digest('hex');
  return crypto.createHash('sha256').update(password).digest('hex');
};

export default hashPassword;
