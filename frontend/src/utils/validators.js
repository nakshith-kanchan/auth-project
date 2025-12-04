export const isValidName = (name) => {
  const re = /^[A-Za-zÀ-ÿ' -]{2,}$/;
  return re.test(name.trim());
};

export const isValidEmail = (email) => {
  const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
  return re.test(email)
}
export const isValidPassword = (pass) => {
  // at least 8 chars, 1 uppercase, 1 number, 1 special char
  const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
  return re.test(pass)
}
export const isValidPhone = (p) => /^\d{7,15}$/.test(p)
