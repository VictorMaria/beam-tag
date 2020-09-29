const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/;
export const whitespacePattern = /^[\s]+$/;

export const signUpValidator = (requestToValidate) => {
    const { email, password } = requestToValidate;
    if (!emailPattern.test(email)) {
        return 'Use a valid Email';
      }
    if(!passwordPattern.test(password)) {
        return 'Password must contain at least one uppercase letter, one lowercase letter and one numeric digit';
    }
    return '';
};

export const signInValidator = (requestToValidate) => {
    const { email, password } = requestToValidate;
    if (!emailPattern.test(email)) {
        return 'Use a valid Email';
      }
    if(!password) {
        return 'Password required';
    }
    return '';
};

