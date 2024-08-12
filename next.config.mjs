/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_MONGO_CONNECTION_URL: "mongodb://localhost:27017/3dauth",
        NEXT_SECRET_TOKEN: "efwefh3489329rfhwekfhwifhwiufhweiufhJFOWJE"
  }
};

export default nextConfig;
