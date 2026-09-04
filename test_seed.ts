import mongoose from "mongoose";
import { getHomeData } from "./src/modules/home/home.controller.js";
import { env } from "./src/config/env.js";

const run = async () => {
  await mongoose.connect(env.MONGO_URI || "mongodb://127.0.0.1:27017/techyad");
  const res = {
    status: (code: number) => ({
      json: (data: any) => console.log(JSON.stringify(data, null, 2))
    })
  };
  await getHomeData({} as any, res as any, (err: any) => console.error(err));
  process.exit(0);
};
run();
