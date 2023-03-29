import ProductItem from "../productItem";
import Pagination from "../pagination";

export default function ListProducts() {
    return (
        <div className="grid grid-cols-1 w-3/4 ">
            <div className="grid grid-rows-1 w-full mb-[30px]">
                <div className="grid grid-cols-4 gap-y-4 gap-x-4">
                    <ProductItem
                        name="Bơ sáp 034 Lâm Đồng..."
                        price="20000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/1_T_GX34ajHqviNUs4O6j8gg-300x300.jpeg"
                    />
                    <ProductItem
                        name="Bưởi da xanh..."
                        price="75000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_1d1797f33c5140e4a7742aa0470d77e5_master-300x300.jpg"
                    />
                    <ProductItem
                        name="Cá basa cắt lát..."
                        price="100000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/ca_basa_huu_co_binca_cat_lat_master-768x768.jpg"
                    />
                    <ProductItem
                        name="Sầu riêng Bình Định..."
                        price="2100000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/sau_rieng_ri6_2_5635cf70bdbc413db7ccdb9bbc5955ed_master-300x300.jpg"
                    />
                    <ProductItem
                        name="Bơ sáp 034 Lâm Đồng..."
                        price="20000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/1_T_GX34ajHqviNUs4O6j8gg-300x300.jpeg"
                    />
                    <ProductItem
                        name="Bưởi da xanh..."
                        price="75000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_1d1797f33c5140e4a7742aa0470d77e5_master-300x300.jpg"
                    />
                    <ProductItem
                        name="Cá basa cắt lát..."
                        price="100000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/ca_basa_huu_co_binca_cat_lat_master-768x768.jpg"
                    />
                    <ProductItem
                        name="Sầu riêng Bình Định..."
                        price="2100000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/sau_rieng_ri6_2_5635cf70bdbc413db7ccdb9bbc5955ed_master-300x300.jpg"
                    />
                    <ProductItem
                        name="Bơ sáp 034 Lâm Đồng..."
                        price="20000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/1_T_GX34ajHqviNUs4O6j8gg-300x300.jpeg"
                    />
                    <ProductItem
                        name="Bưởi da xanh..."
                        price="75000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_1d1797f33c5140e4a7742aa0470d77e5_master-300x300.jpg"
                    />
                    <ProductItem
                        name="Cá basa cắt lát..."
                        price="100000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/ca_basa_huu_co_binca_cat_lat_master-768x768.jpg"
                    />
                    <ProductItem
                        name="Sầu riêng Bình Định..."
                        price="2100000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/sau_rieng_ri6_2_5635cf70bdbc413db7ccdb9bbc5955ed_master-300x300.jpg"
                    />
                    <ProductItem
                        name="Bơ sáp 034 Lâm Đồng..."
                        price="20000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/1_T_GX34ajHqviNUs4O6j8gg-300x300.jpeg"
                    />
                    <ProductItem
                        name="Bưởi da xanh..."
                        price="75000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_1d1797f33c5140e4a7742aa0470d77e5_master-300x300.jpg"
                    />
                    <ProductItem
                        name="Cá basa cắt lát..."
                        price="100000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/ca_basa_huu_co_binca_cat_lat_master-768x768.jpg"
                    />
                    <ProductItem
                        name="Sầu riêng Bình Định..."
                        price="2100000"
                        thumail="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/sau_rieng_ri6_2_5635cf70bdbc413db7ccdb9bbc5955ed_master-300x300.jpg"
                    />
                </div>
            </div>
            <div>
                <Pagination />
            </div>
        </div>
    );
}
