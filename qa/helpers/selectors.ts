/*
  Selector helper methods
*/
export const header = (text: string) => `//h1[text()="${text}"]`;
export const inputByAttributeValue = (attribute: string, text: string) => `//input[@${attribute}="${text}"]`;
export const buttonByAttributeValue = (attribute: string, text: string) => `//button[@${attribute}="${text}"]`;
export const listByAttributeValue = (attribute: string, text: string) => `//ul[@${attribute}="${text}"]`;
export const listItemByText = (text: string) => `//li[text()="${text}"]`;