"use client";

import React from "react";
import { Product } from "../../../../types/common";
import Image from "next/image";
import Error from "@/components/common/error/Error";
import Link from "next/link";

interface Props {
  products: Product[];
  sectionName: string;
}

/* 7개씩만 로드 */

const SalesList = ({ products, sectionName }: Props) => {
  const outdateMask =
    "bg-[#3436378C] absolute w-full h-full z-10 rounded-[6px] flex justify-center items-center text-[#FFFFFE] text-[14px] font-[500]";

  return (
    <div className="flex flex-col gap-[20px] px-[16px] xl:px-0 py-[32px] xl:mx-auto xl:w-[1132px]">
      <div>
        <h2 className="text-[20px] font-bold">{sectionName === "진행중인 공구" ? "진행중인 공구" : "지나간 공구"}</h2>
      </div>
      {products.length > 0 ? (
        <ul className="flex items-center gap-[12px] xl:gap-[23px] overflow-x-auto xl:w-[1132px] xl:flex-wrap">
          {products?.map((product) => (
            <Link key={product?.id} href={`/products/detail/${product.id}`}>
              <li className="flex flex-col gap-[8px] xl:gap-[12px] w-[88px] xl:w-[142px]">
                <div className="w-[88px] h-[96px] xl:w-[142px] xl:h-[148px] rounded-[6px] bg-slate-300 relative">
                  <div className={sectionName === "진행중인 공구" ? "hidden" : outdateMask}>
                    <p>판매 종료</p>
                  </div>
                  <Image
                    src={product?.main_img || ""}
                    alt={product?.title || "product_main_img"}
                    sizes="88px xl:148px"
                    fill
                    priority
                    className="absolute rounded-[6px] xl:w-[142px] xl:h-[148px] "
                  />
                </div>
                <div>
                  <p className="text-[12px] text-[#B2B5B8]">{product?.nickname}</p>
                  <h3
                    className={
                      sectionName === "진행중인 공구"
                        ? "text-[14px] overflow-x-hidden whitespace-nowrap text-ellipsis"
                        : "text-[#B2B5B8] text-[14px] overflow-x-hidden whitespace-nowrap text-ellipsis"
                    }
                  >
                    {product?.title}
                  </h3>
                  <p className="text-[12px] flex gap-[4px]">
                    <span
                      className={
                        sectionName === "진행중인 공구" ? "text-[#F03F33] font-[600]" : "text-[#B2B5B8] font-[600]"
                      }
                    >
                      {Math.trunc(+(product?.price / product?.cost).toFixed(2) * 100)}%
                    </span>
                    <span
                      className={
                        sectionName === "진행중인 공구" ? "text-[#020303] font-[500]" : "text-[#B2B5B8] font-[500]"
                      }
                    >
                      {product?.price}원
                    </span>
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <Error>
          <p>{`${sectionName} 상품이 없습니다.`}</p>
        </Error>
      )}
    </div>
  );
};

export default SalesList;
