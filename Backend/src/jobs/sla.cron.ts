import cron from "node-cron";
import { checkSLABreaches } from "../modules/ticket/sla.breach.service";

export const startSLACron = () => {
  cron.schedule("*/5 * * * *", async () => {
    console.log("🔍 Checking SLA breaches...");
    await checkSLABreaches();
  });
};
