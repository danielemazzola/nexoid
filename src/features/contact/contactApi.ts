import { postJson } from "../../services/http";
import type { ContactTopicId } from "../../data/contact";
import type { CaptchaAnswer } from "../captcha/captchaApi";

export interface ContactPayload {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  topic: ContactTopicId | "";
  message: string;
  privacyAccepted: boolean;
  /** Honeypot anti-bots: debe ir vacío */
  website: string;
}

export interface ContactRequest extends ContactPayload {
  captcha: CaptchaAnswer;
}

export const sendContactRequest = (payload: ContactRequest) =>
  postJson<{ id: string }>("/api/contact", { ...payload, sourcePath: window.location.pathname });
