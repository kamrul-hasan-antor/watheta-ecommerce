import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

const dataPath = path.join(process.cwd(), "data.json");

function ensureDataStructure(data) {
  if (!data.products) data.products = [];
  if (!data.orders) data.orders = [];
  return data;
}

export async function GET() {
  try {
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(
        dataPath,
        JSON.stringify({ products: [], orders: [] }, null, 2)
      );
    }

    const data = fs.readFileSync(dataPath, "utf-8");
    const parsedData = ensureDataStructure(JSON.parse(data || "{}"));

    return NextResponse.json(parsedData);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const productName = formData.get("productName");
    const sku = formData.get("sku");
    const category = formData.get("category");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const active = formData.get("active");
    const description = formData.get("description");
    const productImage = formData.get("productImage");

    if (!productImage || !productName || !price) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const bytes = await productImage.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true });

    const imageName = `${Date.now()}-${productImage.name}`;
    const imagePath = path.join(uploadsDir, imageName);
    await writeFile(imagePath, buffer);

    let data = { products: [], orders: [] };
    if (fs.existsSync(dataPath)) {
      const fileData = fs.readFileSync(dataPath, "utf-8");
      data = ensureDataStructure(JSON.parse(fileData || "{}"));
    }

    // const newProduct = {
    //   id: Date.now(),
    //   name,
    //   price,
    //   image: `/uploads/${imageName}`,
    // };

    const newProduct = {
      id: Date.now(),
      productName,
      sku,
      category,
      price,
      quantity,
      active,
      description,
      productImae: `/uploads/${imageName}`,
    };

    data.products.push(newProduct);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: "Product saved", product: newProduct });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save product" },
      { status: 500 }
    );
  }
}
