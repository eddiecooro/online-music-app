module.exports = {
    Mutation: {
        login:(source,{username,password},ctx)=>{
            return ctx.login(username,password);
        }
    }
}