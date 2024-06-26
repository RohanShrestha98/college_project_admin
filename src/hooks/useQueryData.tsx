import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useQueryData = (key: string[], path: string, params = "", enabled = true) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: [key, params],
    queryFn: () =>
      axiosPrivate({
        url: path,
        method: "get",
        params: params,
      }).then((res) => res?.data && res?.data),
    enabled,
  });
};

export const useTeacherData = () =>
  useQueryData(["teacher"], `api/v3/teacher/list/`);

export const useCategoryData = () =>
  useQueryData(["category"], `api/category/list/`);
export const useProductData = () =>
  useQueryData(["product"], `api/product/list/`);
export const useOrderProductData = () =>
  useQueryData(["buy-product"], `api/buy-product/list/`);
export const useTrackOrderData = () =>
  useQueryData(["track-order"], `api/buy-product/track-order/list`);

export const useContactData = () => useQueryData(["contacts"], "api/contacts");
export const useAdminData = () => useQueryData(["admins"], "api/admins");
export const useAdminFilesData = () =>
  useQueryData(["admin-documemt"], "api/admins/all-files");
export const useShopData = () => useQueryData(["shop-approve"], "api/shop");
// export const useCategoryData = () => useQueryData(["category"], "api/category");
