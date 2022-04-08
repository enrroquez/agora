const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1", // Make sure this corresponds to the region in which you have verified your email address (or 'eu-west-1' if you are using the Spiced credentials)
});

// in server.js, you are going to to want to call this function in your server
// in a POST route (whenever the user wants to reset the password)
exports.sedmail = function (recipient, message, subject) {
    return ses
        .sendEmail({
            Source: "Funky Chicken <funky.chicken@spiced.academy>",
            Destination: {
                ToAddresses: [recipient], //'disco.duck@spiced.academy'
            },
            Message: {
                Body: {
                    Text: {
                        Data: message, // "We can't wait to start working with you! Please arrive on Monday at 9:00 am. Dress code is casual so don't suit up."
                    },
                },
                Subject: {
                    Data: subject, //"Your Application Has Been Accepted!"
                },
            },
        })
        .promise();
};
