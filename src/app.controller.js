import { conectiondb } from "./db/db connection.js"
import { message_router } from "./modules/messages/message.controller.js"
import { user_route } from "./modules/ussers/users.controller.js"

import cors from "cors"


export const bootstrap=(app,express) => {
    //use corse
    app.use(cors())
    app.use(express.json())
    conectiondb()
    app.use('/users',user_route)
    app.use('/messages',message_router)
    app.get('/',(req,res) => {
        res.status(200).json({msg:"hello from saraha app"})
    })
    app.use('*',(req,res) => {
        res.status(404).json({msg:"page not found"})
    })

    app.use((error,req,res,next) => {
       return res.status(404).json({errormessage:error.message,stack:error.stack})
    })
}