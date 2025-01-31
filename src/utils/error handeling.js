export const error_handel=(fn) =>{
    return (req,res,next) => {
        fn(req,res,next).catch((error) => {
            next(error)
        })
    }
}