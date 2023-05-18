import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { USER_ROLES } from "@/utils/Constant";

export default function WithAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
      if (!auth.isAuth || auth.currentUser.role !== USER_ROLES.CUSTOMER) {
        router.push("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}
