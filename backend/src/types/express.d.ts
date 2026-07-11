import { User } from "../generated/prisma/models/User.js";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export { };
