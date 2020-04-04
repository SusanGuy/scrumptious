
const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'npaudyal01@gmail.com',
        subject: 'Welcome to Scrumptious!',
        text: `Welcome to the app, ${name}. Recipe tracker made easy.`
        
    })

}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'npaudyal01@gmail.com',
        subject: 'Ja khate mar!',
        text: `Bye Bye! Ta ${name} muji ghatera malai k huncha ra!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}

