const koa  = require("koa");

const router  = require("koa-router")();

const bodyparser  = require("koa-bodyparser");

const cors = require("koa-cors");

const volidate = require("./utils/volidate");

const { index } = require("./router/get/get");

const { changeUser, addUser } = require("./router/post/post");

const app = new koa();

app.use(volidate);

app.use(cors());

app.use(bodyparser());

app.use(router.routes());

app.use(router.allowedMethods());

router.get('/', index)

router.post('/changeUser', changeUser)

router.post('/addUser', addUser)

app.listen(9999, () => {
    console.log(`🚀 serve start !!`);
})