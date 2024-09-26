import Avatar from "./Avatar";
import Navbar from "./Navbar";

const MyHeader = () => {
  return (
    <section className="flex w-[20rem] flex-col items-center justify-between px-6 bg-slate-600 h-screen py-10">
      <div className="flex flex-col items-center gap-10">
        <div className="w-[15rem]">
          <img
            className="w-full h-full"
            src="/images/logo.jpg"
            alt="logo okvip"
          />
        </div>

        <Navbar />
      </div>

      <Avatar />
    </section>
  );
};

export default MyHeader;
