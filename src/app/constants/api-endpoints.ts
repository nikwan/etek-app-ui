import { environment } from "src/environments/environment";

export class ApiEndpoints {
    // public static server = 'http://localhost:4200/nsdl-edastakhat';
    public static server = environment.apiUrl;

    public static getCaptchaChallenge: string = ApiEndpoints.server + `/captcha/challenge`;
    public static createCaptcha: string = ApiEndpoints.server + `/captcha/create`;

    public static otp: string = ApiEndpoints.server + `esign/otp`;
    public static otpv: string = ApiEndpoints.server + `esign/otpv`;
    public static otpack: string = ApiEndpoints.server + `otpack`;
    public static poll: string = ApiEndpoints.server + `poll`;
    public static pollPoll: string = ApiEndpoints.server + `poll/poll`;
    public static esignTest: string = ApiEndpoints.server + `esign/esignTest`;
}
