import { IconSearch } from "@/components/icons/";
import productAPI from "@/api/productAPI";
import useDebounce from "@/components/hooks/useDebounce";
import { useState, useEffect } from "react";
import SearchResult from "../SearchResults";

export default function SearchBar() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const debounceValue = useDebounce(searchKeyword, 500);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const getAllProduct = async () => {
      if (debounceValue) {
        setIsLoading(true);
        try {
          const response = await productAPI.getAllProduct({
            search: debounceValue.trim(),
          });
          setProducts(response?.data);
          setShowResults(true);
        } catch (err) {
          console.log(err);
        }
        setIsLoading(false);
      } else {
        setProducts([]);
        setShowResults(false);
      }
    };
    getAllProduct();
  }, [debounceValue]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchKeyword(value);
  };

  return (
    <div className="relative flex gap-x-2 items-center text-black px-5 py-2 border-[1px] border-solid border-gray-400 bg-gray-50 rounded-full">
      <IconSearch />
      <input
        value={searchKeyword}
        onChange={handleSearch}
        type="search"
        placeholder="Tìm kiếm..."
        className="focus:outline-none placeholder:text-sm bg-transparent"
      />
      {isLoading ? (
        ""
      ) : (
        <SearchResult products={products} showResults={showResults} />
      )}
    </div>
  );
}
