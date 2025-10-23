"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

export default function CreateProdcut() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const errMsjProps = {
    component: "p",
    className: "text-red-500 text-sm",
  };

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data;
    },
    onSuccess: (data) => {
      toast.success("Product saved successfully!", {
        description: "Redirecting to product list",
        duration: 1500,
        action: {
          onClick: () => redirect("/dashboard/products"),
        },
      });
      setTimeout(() => {
        redirect("/dashboard/products");
      }, 1500);
    },
    onError: (error) => {
      alert("❌ Error: " + error.message);
    },
  });

  const handleAddProducts = (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    mutation.mutate(formData);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Add Products</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleAddProducts(values)}
        validateOnChange={true}
      >
        {({ setFieldValue, values }) => (
          <Form>
            {/* Basic info */}
            <div className="border pt-2 pb-3 px-3 mt-3 bg-white dark:bg-sidebar">
              <p>Basic Info</p>
              <div className="mt-3 grid grid-cols md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm block mb-2 text-gray-600 dark:text-gray-300">
                    Product Name
                  </label>
                  <Field
                    as={Input}
                    name="productName"
                    placeholder="Product Name"
                    className="rounded"
                  />
                  <ErrorMessage name="productName" {...errMsjProps} />
                </div>

                <div>
                  <label className="text-sm block mb-2 text-gray-600 dark:text-gray-300">
                    SKU
                  </label>
                  <Field
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      setFieldValue("sku", value);
                    }}
                    as={Input}
                    name="sku"
                    placeholder="SKU"
                    className="rounded"
                  />
                  <ErrorMessage name="sku" {...errMsjProps} />
                </div>

                <div>
                  <label className="text-sm block mb-2 text-gray-600 dark:text-gray-300">
                    Category
                  </label>
                  <Select
                    onValueChange={(value) => setFieldValue("category", value)}
                  >
                    <SelectTrigger className="w-full rounded">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="category" {...errMsjProps} />
                </div>
              </div>
            </div>

            {/* Inventory info */}
            <div className="border pt-2 pb-3 px-3 mt-3 bg-white dark:bg-sidebar">
              <p>Inventory</p>
              <div className="mt-3 grid grid-cols md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm block mb-2 text-gray-600 dark:text-gray-300">
                    Price
                  </label>
                  <Field
                    as={Input}
                    name="price"
                    placeholder="Price"
                    className="rounded [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                  />
                  <ErrorMessage name="price" {...errMsjProps} />
                </div>

                <div>
                  <label className="text-sm block mb-2 text-gray-600 dark:text-gray-300">
                    Stock Quantity
                  </label>
                  <Field
                    as={Input}
                    name="quantity"
                    placeholder="Quantity"
                    className="rounded [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                  />
                  <ErrorMessage name="quantity" {...errMsjProps} />
                </div>

                <div>
                  <label className="text-sm block mb-2 text-gray-600 dark:text-gray-300">
                    Active Status
                  </label>
                  <div className="flex items-center space-x-2 h-9">
                    <Switch
                      checked={values.active}
                      onCheckedChange={(checked) =>
                        setFieldValue("active", checked)
                      }
                    />
                    <span> {values.active ? "Active" : "Deactive"}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div>
                  <label className="text-sm block mb-2 text-gray-600 dark:text-gray-300">
                    Description (optional)
                  </label>
                  <Field
                    as={Textarea}
                    name="description"
                    placeholder="Description"
                    className="rounded resize-none h-40"
                  />
                </div>
              </div>
            </div>

            {/* Media info */}
            <div className="border pt-2 pb-3 px-3 mt-3 bg-white dark:bg-sidebar">
              <p>Media</p>

              <div className="mt-3 relative">
                <label className="text-sm block mb-2 text-gray-600 dark:text-gray-300">
                  Product Image
                </label>

                {/* Image upload box */}
                <div className="mt-3 grid grid-cols md:grid-cols-4 gap-4">
                  <div className="border-2 border-dashed border-gray-500 rounded p-4 flex flex-col items-center justify-center cursor-pointer h-[200px]">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = event.target.files[0];
                        const isImage = file?.type?.includes("image");
                        if (file && file && isImage) {
                          setFieldValue("productImage", file);
                          setImageUrl(URL.createObjectURL(file));
                        }
                      }}
                      className="absolute opacity-0 w-full h-full cursor-pointer bg-amber-500"
                    />
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Preview"
                        className="h-40 object-contain"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <p className="text-gray-500 text-sm">
                        Click or drag an image here
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-1 pb-2 mt-3">
              <Button type="submit">
                <PlusIcon /> Add Products
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const validationSchema = Yup.object({
  productName: Yup.string()
    .required("Product Name is required")
    .matches(/^[A-Za-z\s]+$/, "Product Name must contain only letters"),
  sku: Yup.string().required("SKU is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be greater than 0"),
  quantity: Yup.number()
    .required("Stock Quantity is required")
    .min(0, "Stock Quantity cannot be negative"),
});

const initialValues = {
  productName: "",
  sku: "",
  category: "",
  price: "",
  quantity: "",
  active: true,
  description: "",
  productImage: null,
};
