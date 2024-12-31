import { createServer } from "node:http";
import axios from "axios";
const hostname = "127.0.0.1";
const port = 8080;
const uri = "http://localhost:3000";

const server = createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/products" && method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Lay danh sach khach hang thanh cong",
        products,
      })
    );
  } else if (url === "/products" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { email, address } = JSON.parse(body);
      const newUser = {
        id: products.length + 1,
        email,
        address,
      };
      products.push(newUser);
      res.writeHead(201);
      res.end(JSON.stringify(newUser));
    });
  } else if (url.match(/\/products\/\d+/) && method === "PUT") {
    const id = parseInt(url.split("/")[2]);
    const userIndex = products.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const { email, address } = JSON.parse(body);
        products[userIndex] = { id, email, address };
        res.writeHead(200);
        res.end(JSON.stringify(products[userIndex]));
      });
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "User not found" }));
    }
  } else if (url.match(/\/products\/\d+/) && method === "DELETE") {
    const id = parseInt(url.split("/")[2]);
    const newproducts = products.filter((u) => u.id !== id);
    products.length = 0;
    products.push(...newproducts);
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Xoa thanh cong", id }));
  } else if (url.match(/\/products\/\d+/) && method === "GET") {
    const id = parseInt(url.split("/")[2]);
    const user = products.find((u) => u.id === id);
    res.writeHead(200);
    res.end(JSON.stringify(user));
  } else {
    console.log("Router not found");
    res.end("Router not found");
  }
});

const instance = axios.create({
  baseURL: uri,
  header: {
    "Content-Type": "application/json",
  },
});

const fetchApi = async () => {
  const { data } = await instance.get(`${uri}/products`);
  return data;
};

app.get("/products", (req, res) => {
  fetchApi();
  return res.status(200).json({
    message: "lấy danh sách user thành công",
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
