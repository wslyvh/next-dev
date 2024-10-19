"use client";

import { postLog } from "@/clients/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { PropsWithChildren, useEffect, useRef } from "react";

const ACTIVITY_CACHE_KEY = "lastActivityDate";

export function LogProvider(props: PropsWithChildren) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const hasMutated = useRef(false);
  const today = new Date().toISOString().split("T")[0];

  const { mutateAsync, isIdle } = useMutation({
    mutationFn: () => postLog(),
    onSuccess: () => {
      hasMutated.current = true;
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      localStorage.setItem(ACTIVITY_CACHE_KEY, today);
    },
  });

  function shouldRecordActivity() {
    const lastActivityDate = localStorage.getItem(ACTIVITY_CACHE_KEY);
    return lastActivityDate !== today;
  }

  useEffect(() => {
    async function log() {
      if (session && shouldRecordActivity() && isIdle && !hasMutated.current) {
        await mutateAsync();
      }
    }

    log();
  }, [session, mutateAsync, isIdle]);

  return <>{props.children}</>;
}
