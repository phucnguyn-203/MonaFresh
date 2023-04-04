import { IconSearch } from "../../icons";
import SearchResult from "../SearchResults";

export default function SearchBar() {
    return (
        <div className="relative flex gap-x-2 items-center text-black px-5 py-2 border-[1px] border-solid border-gray-400 bg-gray-50 rounded-full">
            <IconSearch />
            <input
                type="search"
                placeholder="Tìm kiếm..."
                className="focus:outline-none placeholder:text-sm bg-transparent"
            />
            {/* <SearchResult /> */}
        </div>
    );
}
