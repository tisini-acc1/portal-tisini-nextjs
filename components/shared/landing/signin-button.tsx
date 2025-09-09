"use client";

import Link from "next/link";

const SigninButton = () => {
  // console.log(session);
  // if () {
  //   return (
  //     <div className="flex items-center gap-4 ml-10">
  //       <Link
  //         href="/home"
  //         className="capitalize text-green-500 font-serif hover:border-[#A020F0] hover:text-white transition-all"
  //       >
  //         {session.user.username}
  //       </Link>

  //       <button
  //         onClick={() => {}}
  //         className="ml-4 p-2 px-4 flex items-center text-sm bg-purple-600 rounded-sm hover:bg-purple-800"
  //       >
  //         Log Out
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="flex gap-4 ml-auto items-center">
      <button className="ml-8 p-2 px-4 flex items-center text-white text-sm border rounded-sm hover:bg-purple-800">
        <Link href="/auth/login">Log In</Link>
      </button>

      <button className="ml-4 p-2 px-4 flex items-center text-sm bg-purple-600 rounded-sm hover:bg-purple-800">
        <Link href="/auth/register">Get Started</Link>
      </button>
    </div>
  );
};

export default SigninButton;
