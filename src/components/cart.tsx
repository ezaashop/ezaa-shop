import { IoCart } from "react-icons/io5";
const CartButton = () => {
  const items = 5;
  return (
    <div className="relative">
      {items > 0 && (
        <span className="absolute top-0 right-0 bg-signature text-white w-4 h-4 rounded-full flex items-center justify-center text-xs">
          {items}
        </span>
      )}
      <IoCart className="cursor-pointer size-7" />
    </div>
  );
};

export default CartButton;
