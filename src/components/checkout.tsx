"use client";

import { useAppSelector } from "@/lib/store/hooks";
import bankDetails from "@/utils/bankDetails";
import { H5, H6, Label } from "./typography";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MyImage from "./my-image";

const p =
  "The account details are provided below. Please complete the payment outside the app and don't forget to take a screenshot. Thank you!";

const Checkout = () => {
  const { user } = useAppSelector((store) => store.auth);
  const { id, fname, lname, phone } = user || {};
  const { total_amount } = useAppSelector((store) => store.cart);
  const { bank_name, account_name, account_number } = bankDetails;

  const addressDetails = {
    country: "Pakistan",
    city: "Islamabad",
    address: "F-6 Super Market, Chai Khana",
  };

  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleCheckout = () => {
    if (!image) {
      alert("Please upload a payment screenshot.");
      return;
    }

    console.log("Checkout data:", {
      id,
      name: `${fname} ${lname}`,
      phone,
      total_amount,
      image,
    });
  };

  return (
    <div className="space-y-6 my-10 px-4 max-w-4xl mx-auto">
      <H5 className="text-green-500 font-thin">{p}</H5>

      {/* Bank Details Section */}
      <div className="bg-muted p-6 rounded-xl border border-border space-y-4">
        <H6 className="font-medium text-muted-foreground">Bank Details</H6>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-signature">Bank</Label>
            <H5>{bank_name}</H5>
          </div>
          <div>
            <Label className="text-signature">Account Name</Label>
            <H5>{account_name}</H5>
          </div>
          <div>
            <Label className="text-signature">Account Number</Label>
            <H5>{account_number}</H5>
          </div>
          <div>
            <Label className="text-signature">Total Amount</Label>
            <H5 className="text-foreground font-semibold">Rs {total_amount}</H5>
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="bg-muted p-6 rounded-xl border border-border space-y-4">
        <H6 className="font-semibold text-muted-foreground">Your Information</H6>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-signature">Full Name</Label>
            <H5>
              {fname} {lname}
            </H5>
          </div>
          <div>
            <Label className="text-signature">Phone</Label>
            <H5>{phone}</H5>
          </div>
          <div>
            <Label className="text-signature">City</Label>
            <H5>{addressDetails.city}</H5>
          </div>
          <div>
            <Label className="text-signature">Address</Label>
            <H5>{addressDetails.address}</H5>
          </div>
        </div>
      </div>

      {/* Screenshot Upload Section */}
      <div className="bg-muted p-6 rounded-xl border border-border space-y-4">
        <H6 className="font-semibold text-muted-foreground">
          Upload Screenshot
        </H6>
        <div className="space-y-3">
          <Label className="text-signature">Payment Proof (Image)</Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />

          {image && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-green-600">Preview:</p>
              <MyImage
                src={URL.createObjectURL(image)}
                alt="Payment Screenshot"
                className="rounded-lg border border-border max-h-64 object-contain"
                width={200}
                height={200}
              />
              <button
                onClick={() => setImage(null)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <Button
          onClick={handleCheckout}
          className="w-full mt-4 bg-green-600 hover:bg-green-700"
          disabled={!image}
        >
          Submit Payment
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
