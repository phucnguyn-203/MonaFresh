import React from "react";
import styles from "./styles.module.css";
import Breadcrumb from "../../components/Breadcrumb";

import AboutMona from "../../assets/Cover (1).png";

export default function About() {
    const breadcrumb = [
        {
            title: "trang chủ",
            path: "/",
        },
        {
            title: "giới thiệu",
            path: "/about",
        },
    ];
    return (
        <React.Fragment>
            <div className={styles.bgAbout}>
                <div className="container absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                    <div className="uppercase font-semibold text-white text-3xl">
                        <h1>Giới thiệu</h1>
                    </div>
                    <div className="text-white mt-5">
                        <Breadcrumb breadcrumb={breadcrumb} />
                    </div>
                </div>
            </div>
            <div className="container my-14">
                <h1
                    className={`relative pb-7 mb-6 uppercase text-center text-[45px] font-semibold ${styles.title}`}
                >
                    Mona Fresh
                </h1>
                <h3 className="text-center text-lg font-medium text-[#353535]">
                    Chào mừng đến với trang web bán thực phẩm organic của chúng
                    tôi!
                </h3>
                <div className="text-justify mt-5 text-lg">
                    <p>
                        Thực phẩm là nguồn cung cấp chất dinh dưỡng cho sự phát
                        triển của cơ thể, tác động trực tiếp và gây ảnh hưởng
                        lâu dài đến sức khỏe. Làm sao để lựa chọn được thực phẩm
                        sạch, vừa an toàn về chất lượng, vừa tiết kiệm thời gian
                        để đảm bảo tốt cho sức khỏe của gia đình mình? Hiểu được
                        sự trăn trở chung của các chị em nội trợ và cũng chính
                        là sự lo lắng của bản thân MonaFresh đối với tổ ấm của
                        mình. Chính vì vậy, MonaFresh – chuỗi cửa hàng bán lẻ
                        thực phẩm hữu cơ ra đời, để cùng đồng hành, chia sẻ với
                        các chị em nội trợ trong việc lựa chọn thực phẩm sạch,
                        nguồn gốc rõ ràng để bảo vệ sức khỏe, làm nền tảng cho
                        sự phát triển khoẻ mạnh của bạn và gia đình ở thời điểm
                        hiện tại và cả tương lai sau này.{" "}
                    </p>
                    <div className="my-8">
                        <img src={AboutMona} />
                    </div>
                    <p>
                        Chúng tôi tự hào giới thiệu đến quý khách hàng những sản
                        phẩm thực phẩm organic chất lượng cao, được sản xuất và
                        chăm sóc bằng phương pháp tự nhiên và bền vững.
                        <br />
                        Với sứ mệnh mang lại những sản phẩm an toàn và tốt cho
                        sức khỏe của con người và môi trường, chúng tôi luôn nỗ
                        lực tìm kiếm và cung cấp những sản phẩm thực phẩm
                        organic tốt nhất từ các nông trại, trang trại và đơn vị
                        sản xuất uy tín trong và ngoài nước.
                        <br />
                        Trên trang web của chúng tôi, quý khách hàng có thể tìm
                        thấy các sản phẩm thực phẩm organic đa dạng, bao gồm rau
                        củ quả, thực phẩm từ động vật, đồ uống và các sản phẩm
                        tinh dầu thơm cùng nhiều sản phẩm khác. Tất cả sản phẩm
                        của chúng tôi đều được kiểm tra và chứng nhận đảm bảo
                        chất lượng và an toàn cho sức khỏe của người tiêu dùng.
                        <br />
                        Chúng tôi cam kết đem đến sự hài lòng và tin tưởng của
                        quý khách hàng về sản phẩm và dịch vụ của chúng tôi.
                        <br />
                        Cảm ơn quý khách đã ghé thăm trang web của chúng tôi.
                        Hãy đặt hàng ngay để tận hưởng sự tươi ngon và an toàn
                        của các sản phẩm thực phẩm organic của chúng tôi!
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
}
