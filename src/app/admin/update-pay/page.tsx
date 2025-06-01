import { getPaymentMethods } from "@/app/actions";
import PaymentMethodForm from "@/components/updatepaymentform";

const Page = async () => {
  const methods = await getPaymentMethods();
  console.log("Payment Methods:", methods);
  return <PaymentMethodForm data={methods} />;
};
export default Page;
