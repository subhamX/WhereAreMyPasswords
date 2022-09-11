// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'

const apiKey = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(apiKey)


const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })



type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {



    if (req.method === 'POST') {
      const toUser = req.body.toUser;
      const encryptedData = req.body.encryptedPayload;

      if(!toUser || !encryptedData){
        throw new Error('Invalid body params')
      }

      // const msg = {
        
      // };


      const response = await sgMail.send({
        to: toUser,
        from: 'idevsubham@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        // text: 'and easy to do anywhere, even with Node.js',
        attachments: [
          {
            content: Buffer.from(encryptedData).toString('base64'),
            filename: "whereAreMyPasswords.txt",
            type: "text/plain",
            disposition: "attachment"
          }
        ],
        templateId: 'd-88e42a35368f4722b80f06fec2534ab5',
      })
      console.log(response)
      return res.status(200).json({ ok:true, response })
    }else{
      throw new Error('Invalid request!')
    }

  } catch (err: any) {
    return res.status(200).json({ ok: false, message: err.message })

  }


}
