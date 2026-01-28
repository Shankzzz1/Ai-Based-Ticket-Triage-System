import "dotenv/config";
import app from "./app";
import { startSLACron } from "./jobs/sla.cron";

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startSLACron(); // 🔥 SLA breach detection starts
});