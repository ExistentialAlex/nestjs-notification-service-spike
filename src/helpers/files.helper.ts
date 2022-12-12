import { readFileSync } from 'fs';

export const getTemplate = (template: string): string => {
  return readFileSync(process.cwd() + '/templates/' + template).toString();
};

export const getAttachment = (filename: string): Buffer => {
  return readFileSync(process.cwd() + '/attachments/' + filename);
};
