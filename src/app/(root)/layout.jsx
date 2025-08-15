import Navbar from "@/components/Navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <main className="bg-white w-full">
      <Navbar />
      <div
        className="flex"
        style={{
          background:
            "linear-gradient(120.48deg, #DDDFF4 0%, #EEEBF7 37.75%, #FCDDDB 102.49%)",
        }}
      >
        <section className="flex min-h-screen flex-1 flex-col px-4 lg:px-[56px] py-[24px] lg:py-[32px]">
          <div className="mx-auto w-full max-w-[1328px]">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
