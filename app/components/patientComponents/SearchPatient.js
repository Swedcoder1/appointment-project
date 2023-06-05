import { HiOutlineSearch } from "react-icons/hi";

const SearchPatient = () => {
  return (
    <div>
      <form>
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <HiOutlineSearch className="text-2xl" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-gray-900 border-b-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search patients.."
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchPatient;
