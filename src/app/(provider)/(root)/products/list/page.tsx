"use client";
import ListCategory from "@/components/products/list/ListCategory";
import ProductsList from "@/components/products/list/ProductsList";
import React from "react";

const list = () => {
  return (
    <div>
      <ListCategory />
      <ProductsList />
    </div>
  );
};

export default list;