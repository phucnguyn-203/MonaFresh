import PageLayout from "../../components/layout/pageLayout";
import CustomerTable from "../../components/customer/CustomerTable/CustomerTable";
export default function Customer() {
    return (
        <PageLayout title="Khách hàng">
            <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
                <div className="p-4">
                    <form className="py-3 grid gap-4 ">
                        <div className="flex-grow-0">
                            <input
                                type="search"
                                placeholder="Nhập tên khách hàng"
                                className="block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 border h-12 bg-gray-100 border-transparent focus:bg-white"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <CustomerTable />
        </PageLayout>
    );
}
