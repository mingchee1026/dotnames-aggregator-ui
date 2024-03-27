import React from "react";

type Props = {
  id: string; // drawer id
  children?: React.ReactChild;
};

function MoreItemsDrawer({ id, children }: Props) {
  return (
    <div className="drawer drawer-end relative top-0">
      <input
        id={`more_cart_items_drawer-${id}`}
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content relative top-0 flex justify-end mt-2 ">
        {/* Page content here */}
        <label
          htmlFor={`more_cart_items_drawer-${id}`}
          className="drawer-button btn btn-sm text-xs gap-[2px] items-center flex relative top-0 z-auto"
        >
          More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </label>
      </div>
      <div className="drawer-side  ">
        <label
          htmlFor={`more_cart_items_drawer-${id}`}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className=" p-4  w-1/2 right-0 min-h-full  text-base-content bg-base-100 z-auto">
          {/* Sidebar content here */}
          {children}
        </ul>
      </div>
    </div>
  );
}

export default MoreItemsDrawer;
