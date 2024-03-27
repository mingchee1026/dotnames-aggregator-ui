import React from "react";

type Props = {};

function ContactUs({}: Props) {
  return (
    <div className="py-5 space-y-10">
      <div className="px-5 lg:px-0">
        <div className="text-center h-[10em] lg:p-8 border bg-[#e1e1e164] border-gray-400/20 rounded-2xl space-y-3 flex items-center justify-center flex-col xl:flex-row xl:justify-between ">
          <p className="text-2xl font-[500] text-[#5D5A88]">Contact Us</p>
          <div className="flex gap-4 ">
            <button className="btn btn-secondary rounded-full text-xs  text-white px-5">
              {" "}
              Email
            </button>
            <button className="btn btn-outline  bg-white rounded-full text-[#5D5A88] px-4 text-xs">
              {" "}
              Talk on Telegram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
