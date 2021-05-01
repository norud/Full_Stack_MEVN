import tokenService from '../services/Token';

export default {
    checkUser: async (req, res, next) => {
        if (!req.headers.token){
            return res.status(404).send({
                status: 404,
                message: "You are not authenticated!",
                descriptions:
                "You don't have token",
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Admin' || response.rol == 'Manager' || response.rol == 'Seller'){
            next();
        }else{
            return res.status(403).send({
                status: 403,
                message: "You are not authorized!",
                descriptions:
                "You aren't authorized to make this task",
            })
        }

    },
    checkUserRolAdmin: async (req, res, next) => {
        if (!req.headers.token){
            return res.status(404).send({
                status: 404,
                message: "You are not authenticated!",
                descriptions:
                "You don't have token",
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Admin'){
            next();
        }else{
            return res.status(403).send({
                status: 403,
                message: "You are not authorized!",
                descriptions:
                "You aren't authorized to make this task",
            })
        }
    },
    checkUserRolManager: async (req, res, next) => {
        if (!req.headers.token){
            return res.status(404).send({
                status: 404,
                message: "You are not authenticated!",
                descriptions:
                "You don't have token",
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Admin' || response.rol == 'Manager'){
            next();
        }else{
            return res.status(403).send({
                status: 403,
                message: "You are not authorized!",
                descriptions:
                "You aren't authorized to make this task",
            })
        }
    },
    checkUserSeller: async (req, res, next) => {
        if (!req.headers.token){
            return res.status(404).send({
                status: 404,
                message: "You are not authenticated!",
                descriptions:
                "You don't have token",
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Admin' || response.rol == 'Seller'){
            next();
        }else{
            return res.status(403).send({
                status: 403,
                message: "You are not authorized!",
                descriptions:
                "You aren't authorized to make this task",
            })
        }
    }
}