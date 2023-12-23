import Image from "next/image";

const Header = () => {
  return (
    <div className="flex p-2 gap-3 border-b">
      <div className="border rounded-md p-2">
        <Image src="/afc-logo.png" alt="" width={70} height={70} />
      </div>
      <div className="flex items-center justify-center">
        <h1 className="text-xl font-bold">Django FC</h1>
      </div>
    </div>
  );
};

export default Header;
