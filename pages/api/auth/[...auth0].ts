import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

const getLoginState = (req) => {
    // temporary the nextjs version is strict to 12.0.7
    // because this piece of code below is causing issues
    // with nextjs version 12.0.10 (currectly the latest one)
    // and the deployment process cannot be finished
    // we will revisit the issue with each new released version
    return {
        returnTo: req?.headers?.referer,
    };
};

export default handleAuth({
    async login(req, res) {
        try {
            await handleLogin(req, res, { getLoginState });
        } catch (error) {
            // Add your own custom error handling
            res.status(error.status || 400).end(error.message);
        }
    },
});
