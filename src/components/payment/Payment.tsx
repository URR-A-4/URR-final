import usePayment from "@/hooks/usePayment";
import { useAddrStore } from "@/zustand/addrStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InfoOnEditAddress from "../mypage/edit/InfoOnEditAddress";
import swal from "sweetalert";

export default function Payment() {
  const paymentFunc = usePayment();
  const router = useRouter();
  const { productList } = useAddrStore();
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string | null>("");
  const [request, setRequest] = useState<string>("");
  const price = productList?.reduce((acc: any, cur: any) => {
    return acc + cur.amount * cur.quantity;
  }, 0);
  const totalAmount = price + 3000;

  const handleSubmit = async () => {
    try {
      const phoneNumberRegex = /^\d+$/;
      if (!fullName || !phoneNumber || !address) {
        swal("이름, 휴대폰 번호, 주소를 모두 입력해 주세요.");
        return;
      }
      if (!phoneNumberRegex.test(phoneNumber)) {
        swal("휴대폰 번호는 숫자만 입력해야 합니다.");
        return;
      }

      if (productList) {
        const response = await paymentFunc({
          fullName: fullName,
          orderCount: 2,
          orderName: "sample test",
          price: price,
          address,
          phoneNumber: phoneNumber,
          productList: productList,
          request: request
        });

        if (response?.paymentId) {
          // swal("결제가 성공적으로 완료되었습니다.");
          router.push(`/payment/loading?paymentId=${response.paymentId}`);
        } else {
          swal("결제 중 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      swal("구매하시려면 로그인 해주세요");
    }
  };

  return (
    <>
      <div className="w-[375px] xl:w-full mx-auto xl:mx-0 xl:flex xl:flex-col xl:justify-center xl:items-center xl:pt-12 xl:pb-16 xl:bg-center xl:bg-cover xl:bg-[url('../../public/bgImg/PaymentBgImg.png')] xl:bg-no-repeat ">
        <p className="hidden xl:block text-[24px] font-semibold pb-8">결제하기</p>
        <div className="xl:flex gap-8">
          <div className="bg-[gray-100] flex justify-center xl:w-[376px]">
            <div className="w-full flex flex-col items-start gap-[8px] bg-white rounded-2xl text-[14px] xl:text-[18px] p-[16px]">
              <p className="text-[20px]  font-semibold mb-[4px] xl:mb-4">주문자 정보</p>
              <p>
                <span>주문자</span>
                <span className="text-red-600"> *</span>
              </p>
              <input
                className="border border-gray-200 rounded-md w-full h-[48px] p-[8px] mb-2"
                type="text"
                placeholder="이름"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <p>
                <span>휴대폰</span>
                <span className="text-red-600"> *</span>
              </p>
              <input
                className="border border-gray-200 rounded-md w-full h-[48px] p-[8px] mb-2"
                type="text"
                placeholder="휴대폰 번호"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <InfoOnEditAddress address={address ? address.split(",") : ""} setAddress={setAddress} required={true} />

              <p className="mt-2">배송 요청사항</p>
              <input
                className="border border-gray-200 rounded-md w-full h-[48px] p-[8px]"
                type="text"
                placeholder="부재시, 경비실에 놔주세요"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              />
              <button
                className="w-full xl:hidden h-[52px] rounded-md bg-[#1A82FF] text-white mt-[20px]"
                onClick={handleSubmit}
              >
                구매하기
              </button>
            </div>
          </div>
          <div className="hidden xl:block mt-20 w-[430px] h-[401px] bg-white px-[42px] py-[52px] rounded-3xl shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.25),_0px_0px_4px_0px_rgba(0,_0,_0,_0.08),_0px_0px_1px_0px_rgba(0,_0,_0,_0.08)]">
            <div className="flex flex-col gap-[28px]">
              <p className="text-[20px] font-semibold">결제비용</p>
              {price > 0 && (
                <div className="text-[18px] text-[#4C4F52]">
                  <div className="flex justify-between py-1">
                    <p>주문 금액</p>
                    <p>{price.toLocaleString()} 원</p>
                  </div>
                  <div className="flex justify-between py-1">
                    <p>배송비</p>
                    <p>3,000 원</p>
                  </div>
                </div>
              )}
            </div>
            {totalAmount > 0 && (
              <div className="flex justify-between text-[18px] pt-[46px] pb-[44px]">
                <p>최종 결제 금액</p>
                <p>{totalAmount.toLocaleString()} 원</p>
              </div>
            )}
            <button
              className="w-full h-[50px] rounded-md bg-primarynormal text-white  text-[20px]"
              onClick={handleSubmit}
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
