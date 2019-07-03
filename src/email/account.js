const sgMail = require('@sendgrid/mail')
//const sendgridAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'alqattan2000@gmail.com',
//     from : 'alqattan2000@hotmail.com',
//     subject: 'This is my First Creation',
//     text: 'I hope you can see this mail from the first run.'

// })
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
            to: email,
            from : 'alqattan2000@gmail.com',
            subject: 'Thanks for Joining in!',
            text: `hello ${name} \n Welcome to the app \nYou are most welcome`

        
        })
}
const sendCancellationEmail = (email, name) => {
    sgMail.send({
            to: email,
            from : 'alqattan2000@gmail.com',
            subject: 'Account Delete!',
            text: `hello ${name} \n we are wandering if we can do anything makes yous satisfied \n we are looking to keep you with us`
            
        
        })
}
module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail

}