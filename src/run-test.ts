import server from "./server";
// import { HealthcheckerSimpleCheck, HealthcheckerDetailedCheck } from './index'

server.listen(8888, () => {
  console.log(`[SERVER] Running at http://localhost:8888`);
});
