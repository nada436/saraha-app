export const validation=(schema)=>async(req,res,next) => {
    const errors = [];
    for (const key of Object.keys(schema)) {
    const validation=await schema[key].validate(req[key], { abortEarly: false })
    if(validation?.error)
    {errors.push(validation.error.details)}
} if(errors.length>0){
    return res.json(errors.map((err) => {
        return err
    }))
}
next()


}

