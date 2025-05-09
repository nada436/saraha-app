import nodemailer from "nodemailer";
export const sendemail=async(to,html) => {

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: "nada.nasr436@gmail.com",
    pass: "xajksmusfqxbdctn",
  },
});



  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"nada 👻" <nada.nasr436@gmail.com>', 
    to: to,
    subject: "account confirmation", 
    text: "Please click the button below to confirm your account",
    html: html
  });
  if(info.accepted.length>0){
     return true
  }else{
    return false
  }
 




}
