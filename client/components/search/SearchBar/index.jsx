import { IconSearch } from "@/components/icons/";
import productAPI from "@/api/productAPI";
import useDebounce from "@/components/hooks/useDebounce";
import { useState, useEffect } from "react";
import SearchResult from "../SearchResults";

export default function SearchBar() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isShowResults, setIsShowResult] = useState(false);
  const debounceValue = useDebounce(searchKeyword, 500);

  useEffect(() => {
    const getAllProduct = async () => {
      if (debounceValue) {
        setIsSearching(true);
        try {
          const response = await productAPI.getAllProduct({
            search: debounceValue.trim(),
          });
          setProducts(response?.data);
          setIsShowResult(true);
        } catch (err) {
          console.log(err);
        }
        setIsSearching(false);
      } else {
        setProducts([]);
        setIsShowResult(false);
      }
    };
    getAllProduct();
  }, [debounceValue]);

  const handleClickResultItem = () => {
    setIsShowResult(false);
    setSearchKeyword("");
  };

  return (
    <div className="relative flex gap-x-2 items-center text-black px-5 py-2 border-[1px] border-solid border-gray-400 bg-gray-50 rounded-full">
      <IconSearch />
      <input
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        type="search"
        placeholder="Tìm kiếm..."
        className="focus:outline-none placeholder:text-sm bg-transparent"
      />
      {isShowResults && (
        <SearchResult
          products={products}
          isSearching={isSearching}
          handleClickResultItem={handleClickResultItem}
        />
      )}
    </div>
  );
}
