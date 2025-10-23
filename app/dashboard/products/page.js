"use client";

import ProductTable from "@/components/ProductTable";
import { useQuery } from "@tanstack/react-query";

export default function ProductList() {
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data?.products || [];
  };

  const { data: products, status } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (status === "pending") return <p>Loading products...</p>;
  if (status === "error") return <p>Error...</p>;

  // console.log(products);

  return (
    <div>
      <h1 className="text-xl font-semibold">Products List</h1>
      <div className="border pt-2 pb-3 px-3 mt-3 bg-white dark:bg-sidebar">
        <ProductTable data={products} />
      </div>
    </div>
  );
}
