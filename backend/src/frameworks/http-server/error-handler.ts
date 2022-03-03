// import { CustomError } from "@common/errors";

// export const errorHandler = (error, req, res, __) => {
//     if (error instanceof CustomError) {
//         return res.status(error.HTTPstatusCode).json({
//             errors: error.serializeErrors().map(error => {
//                 return ({message: req.polyglot.t(error.message)})
//             })
//         });
//     }
//     return res.status(500).json({
//         errors: [{ message: error.toString() }],
//     });
// };
