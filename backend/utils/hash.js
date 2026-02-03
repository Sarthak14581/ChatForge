import bcrypt from "bcrypt";

export async function hashedPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  // returns a promise so we have to await to get the hash password when using this function
  return hash;
  
}

export async function comparePassword(plainPassword, hasedPassword) {
  return bcrypt.compare(plainPassword, hasedPassword)
}