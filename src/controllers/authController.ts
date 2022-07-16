import sessionService from "../services/sessionService.js";
import userService from "../services/userService.js";

export async function signUp(req, res) {
    const { email, password } = res.locals.body;
    console.log({ email, password });
    await userService.emailExist(email);
    await userService.insert(email, password);
    res.sendStatus(201);
}

export async function signIn(req, res) {
    const { email, password } = res.locals.body;
    const user = await userService.findByEmail(email);
    await userService.verifyPassword(user, password);
    const session = await sessionService.newSession(user);
    const token = await userService.generateToken(session);
    res.send(token);
}
