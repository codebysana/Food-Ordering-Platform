import type { CartItem } from "@/pages/DetailPage";
import type { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
};

const OrderSummary = ({ restaurant, cartItems }: Props) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>£ {getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              £{((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
      </CardContent>
    </>
  );
};

export default OrderSummary;
