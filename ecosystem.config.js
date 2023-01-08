module.exports = {
  apps : [{
    name: "app",
    script: "index.js",
    watch: true,
    autorestart: true,
    args: "--port=8080",
  },{
    name: "app0",
    script: "index.js",
    watch: true,
    autorestart: true,
    args: "--port=8081 --modo=cluster",
  },{
    name: "app1",
    script: "index.js",
    watch: true,
    autorestart: true,
    args: "--port=8082",
  },
  {
    name: "app2",
    script: "index.js",
    watch: true,
    autorestart: true,
    args: "--port=8083",
  },
  {
    name: "app3",
    script: "index.js",
    watch: true,
    autorestart: true,
    args: "--port=8084",
  },
  {
    name: "app4",
    script: "index.js",
    watch: true,
    autorestart: true,
    args: "--port=8085",
  }]
}
