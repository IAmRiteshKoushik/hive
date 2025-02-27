import { InitServer } from "./server";

const app = new InitServer();
app.setup();
app.start();

export default app;
