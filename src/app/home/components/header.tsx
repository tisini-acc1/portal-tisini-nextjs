import Image from "next/image";
import HeaderButton from "./header-button";

const Header = ({ title, url }: { url?: string; title?: string }) => {
  return (
    <div className="flex justify-between p-2 gap-3 border-b">
      <div className="flex gap-3">
        <div className="border rounded-md p-2">
          <Image src="/afc-logo.png" alt="" width={70} height={70} />
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold">Django FC</h1>
        </div>
      </div>

      <div className="flex flex-col justify-end">
        {title && url && <HeaderButton title={title} url={url} />}
      </div>
    </div>
  );
};

export default Header;
