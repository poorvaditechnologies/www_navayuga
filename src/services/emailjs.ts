import emailjs from '@emailjs/browser';
import { EMAILJS } from '@/constants/site';

export function sendJoinRequest(templateParams: Record<string, string>) {
  return emailjs.send(EMAILJS.serviceId, EMAILJS.joinTemplateId, templateParams, EMAILJS.publicKey);
}
