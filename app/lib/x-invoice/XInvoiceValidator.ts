export default class XInvoiceValidator {
  public static validateURI(uri: string): boolean {
    return uri !== '';
  }

  public static validateEMail(email: string): boolean {
    return email !== '';
  }
}
