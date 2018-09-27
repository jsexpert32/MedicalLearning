// api url
export const baseUrl = "http://52.14.72.225/api/v1";

export const accountUrl = baseUrl + "/account";

export const contactUrl = baseUrl + "/contact";
export const signupUrl = baseUrl + "/signup";
export const signinUrl = baseUrl + "/login"

export const forgotPasswordUrl = baseUrl +"/forgot";
export const resetPasswordUrl = baseUrl + "/reset";
export const resendVerificationUrl = baseUrl + "/resend";

export const googleUrl = baseUrl +"/auth/google";
export const faceBookUrl = baseUrl + "/auth/facebook";

export const confirmEmailUrl = baseUrl + "/confirmation";

export const tutorListUrl = baseUrl + "/tutors";

export const availableUrl = baseUrl + "/availability";
export const appointmentUrl = baseUrl + "/appointments";
export const trialUrl = baseUrl + "/trial_slots";

export const trialStudentUrl = trialUrl + "/student";
export const bookTrialUrl = trialUrl + "/book";

// storage name
export const token = "medi_token";
export const userInfo = "medi_user";