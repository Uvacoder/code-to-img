/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Link from "next/link";
import { useSupportDialog } from "../contexts/SupportDialogContext";

const SupportDialog = () => {
  const { isShowing, closeSupportDialog } = useSupportDialog();

  return (
    <div
      className={clsx([
        "fixed inset-0 w-full h-full z-50 flex justify-center py-24 px-8 overflow-y-auto transition-colors duration-300 ease-in-out",
        {
          "bg-black/50 pointer-events-auto": isShowing,
          "pointer-events-none": !isShowing,
        },
      ])}
    >
      <div
        className={clsx([
          "bg-gray-800/80 backdrop-blur-md border border-gray-700 w-full max-w-xl p-8 h-fit rounded-xl text-white shadow-xl transition-all duration-300 ease-in-out",
          {
            "translate-y-[-100px] opacity-0": !isShowing,
            "translate-y-0 opacity-100": isShowing,
          },
        ])}
      >
        <div>
          <h2 className="text-2xl font-bold my-6">Hi, There 👋</h2>
          <p className="my-4">
            I&apos;m{" "}
            <Link
              className="font-medium"
              target="_blank"
              href="https://rohid.dev"
            >
              Rohid
            </Link>{" "}
            ✌️. Creator of <b>CodeToImg</b>. I&apos;m an indie full-stack
            freelance developer living in Bangladesh 🇧🇩. I make software and
            services that help people like you and me in their daily life. This
            service is 100% ad-free 🥳. I don&apos;t want to break the user
            experience by showing ads to my users. BTW, You can still support me
            and the development of this and many other future projects by buying
            me a cup of coffee ☕.
          </p>
          <p className="my-4">
            Hey, you don&apos;t have to do this, but I would really appreciate
            your support 😃
          </p>
          <a
            href="https://www.buymeacoffee.com/rohid"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center my-16"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              height="40px"
              width="200px"
            />
          </a>
        </div>
        <div className="flex items-center justify-end mt-8">
          <button
            className="px-6 py-2 rounded-md hover:bg-gray-700 flex items-center justify-center font-medium"
            onClick={closeSupportDialog}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportDialog;
