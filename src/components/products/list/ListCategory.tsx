import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface ListCategoryProps {
  onSelectCategory: (category: string) => void;
}

export default function ListCategory({ onSelectCategory }: ListCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const categories = [
    { name: "전체", image: "/categories/전체.png" },
    { name: "뷰티", image: "/categories/뷰티.png" },
    { name: "패션/잡화", image: "/categories/패션잡화.png" },
    { name: "식품", image: "/categories/식품.png" },
    { name: "헬스건강", image: "/categories/헬스건강.png" },
    { name: "반려동물용품", image: "/categories/반려동물용품.png" },
    { name: "생활용품", image: "/categories/생활용품.png" },
    { name: "가전/디지털", image: "/categories/가전디지털.png" },
    { name: "취미/도서", image: "/categories/취미도서.png" }
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);

    router.push(`?category=${category}`);
  };

  useEffect(() => {
    if (categoryParam) {
      handleCategoryClick(categoryParam);
    }
  }, [categoryParam]);

  return (
    <div className="xl:flex xl:flex-col xl:items-center ">
      <p className="hidden xl:block xl:py-8 text-[24px] ">스토어</p>
      <div className="container mx-auto bg-[#F5F7FA] xl:w-[1132px] w-[400px]">
        <div className="flex h-[95px] xl:h-[158px] xl:px-[24px] xl:py-[16px] overflow-x-auto space-x-1 justify-between items-center p-2 ">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`category-item text-center items-center min-w-[75px] h-[70px] xl:w-[120px] xl:h-[110px] cursor-pointer flex flex-col gap-1 ${
                selectedCategory === category.name ? "text-primarynormal" : ""
              } transition-transform duration-200 ease-in-out`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative w-[44px] h-[44px] xl:w-[80px] xl:h-[80px]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="44px xl:80px"
                  className={`object-cover mx-auto mb-2 border-2 rounded-lg ${
                    selectedCategory === category.name ? "border-primarynormal" : ""
                  } transition-colors duration-200 ease-in-out`}
                />
              </div>
              <p className="text-[14px] xl:text-[18px] font-normal">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
