module.exports = async (ctx, next) => {
  if (ctx.config.xss) {
    let body = JSON.stringify(Object.assign({}, ctx.request.body));
    let query = JSON.stringify(Object.assign({}, ctx.query));
    if (body && /\<|\>/.test(body)) {
      ctx.request.body = JSON.parse(body.replace(/\</g, '&lt;').replace(/\>/g, '&gt;'));
    }
    if (query && /\<|\>/.test(query)) {
      ctx.query = JSON.parse(query.replace(/\</g, '&lt;').replace(/\>/g, '&gt;'));
    }
  }
  await next();
}
