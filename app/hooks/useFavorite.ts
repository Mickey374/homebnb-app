import axios from "axios";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUserFavorite {
  listingId: string;
  currentUser: SafeUser | null;
}

const useUserFavorite = ({ listingId, currentUser }: IUserFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = axios.post(`/api/favorites/${listingId}`);
        }

        await request;
        router.refresh();
        toast.success("Success!");
      } catch (error: any) {
        toast.error("Something went wrong!");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useUserFavorite;
