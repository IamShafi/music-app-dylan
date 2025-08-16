import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <main className="bg-white w-full relative">
      <Navbar />
      <div
        className="flex"
        style={{
          background:
            "linear-gradient(120.48deg, #DDDFF4 0%, #EEEBF7 37.75%, #FCDDDB 102.49%)",
        }}
      >
        <section className="flex min-h-screen flex-1 flex-col px-4 lg:px-[56px] py-[24px] lg:py-[32px] pb-[120px] lg:pb-[100px]">
          <div className="mx-auto w-full max-w-[1328px]">{children}</div>
        </section>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
