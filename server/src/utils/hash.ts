import crypto from "crypto"

export const hashText = (text:string) => {

 return crypto
  .createHash("sha256")
  .update(text)
  .digest("hex")

}