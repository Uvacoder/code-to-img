import { MdAdd } from "react-icons/md";
import SnippetCard from "./SnippetCard";

const Page = () => {
  return (
    <div>
      <header className="flex items-center justify-end mb-8">
        <button className="bg-primary-500 text-white px-3 h-10 rounded-md flex items-center justify-center font-medium gap-2 hover:bg-primary-600">
          <MdAdd className="text-2xl" />
          <p className="px-1">New Snippet</p>
        </button>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        <SnippetCard />
        <SnippetCard />
        <SnippetCard />
        <SnippetCard />
        <SnippetCard />
        <SnippetCard />
      </div>
    </div>
  );
};

export default Page;
