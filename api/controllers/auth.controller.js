import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "../config";
import {RequestClient} from 'reqclient'

export default class authController {
    static login = async (req, res) => {
        const {body: {idToken}} = req

    console.log(req.body)
        const resp = await getAccessTokenFromCode(idToken)
        return res.json({})

        // const user = new User({
        //     username: req.body.username,
        //     // description: req.body.description,
        //     // published: req.body.published ? req.body.published : false
        // });
        //
        // user
        //     .save(user)
        //     .then(data => {
        //         res.send(data);
        //     })
        //     .catch(err => {
        //         res.status(500).send({
        //             message:
        //                 err.message || "Some error occurred while creating the User."
        //         });
        //     });
    };
    static logout = (req, res) => {

    };

}


async function getAccessTokenFromCode(code) {
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    console.log(code)
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: code,
            audience: GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(payload)
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    }
    verify().catch(console.error);
}
