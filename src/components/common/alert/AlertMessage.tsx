"use client";

import { useUserData } from "@/hooks/useUserData";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "../../../../supabase/client";
import { useAlertchatStore } from "@/zustand/alertchatStore";
import { useEffect, useState } from "react";

function AlertMessage() {
  const pathname = usePathname();
  const userdata = useUserData().data;
  const supabase = createClient();
  const router = useRouter();

  const { isAlert, setIsAlert } = useAlertchatStore();
  const [channelList, setChannelList] = useState<{ channel_id: number; owner_id: string; }[]>([]);
  const [myChannelId, setMyChannelId] = useState<number | null>(null)

  const getMyChannelId = async () => {
    const user_id: string = userdata.id
    const { data } = await supabase
      .from('chat_channels')
      .select('channel_id')
      .eq('owner_id', user_id)
      .single()
    if (data) {
      setMyChannelId(data.channel_id);
      setChannelList((pre) => {
        return [
          ...pre,
          { channel_id: data.channel_id, owner_id: user_id }
        ]
      });
    }
  }

  const getChannelIdList = async () => {
    const user_id = userdata.id;
    const approve = userdata.approve;
    if (approve) {
      await getMyChannelId();
    }
    const { data } = await supabase
      .from('chat_subscribe')
      .select(`
        channel_id,
        chat_channels(
          owner_id
        )
        `)
      .eq('user_id', user_id)
      .order('last_time', { ascending: false });

    if (data) {
      data.map((subscribe) => {
        setChannelList((pre) => {
          if (subscribe.chat_channels) {
            return [
              ...pre,
              { channel_id: subscribe.channel_id, owner_id: subscribe.chat_channels.owner_id }
            ]
          } else {
            return [...pre];
          }
        });


      })
    }
  }

  const receiveChatMessage = async () => {
      const user_id = await userdata.id;
      const approve = await userdata.approve;
      const channelIdList = channelList.map((channel) => { return channel.channel_id })
      const channelsMessage = supabase
        .channel("changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `channel_id=in.(${channelIdList})`
          },
          (payload) => {
            const newMessage = payload.new;
            if (approve && newMessage.channel_id === myChannelId) {
              setIsAlert(true);
            } else {
              const channel_data = channelList.find((channel) => channel.channel_id === newMessage.channel_id)
              if (channel_data)
                if (newMessage.user_id === user_id || newMessage.user_id === channel_data.owner_id) {
                  setIsAlert(true);
                }
            }
          }
        )
        .subscribe();
  };

  useEffect(() => {
    if (userdata != undefined) {
      getChannelIdList();
    }
  }, [userdata])

  useEffect(() => {
    if (userdata != undefined) {
      receiveChatMessage();
    }
  }, [channelList, pathname])

  if (
    pathname.startsWith("/chatlist")
  ) {
    return null;
  }

  return (
    <div className={isAlert ? "absolute z-50 w-[6px] h-[6px] top-0 right-0 bg-[#FF5E5E] rounded-full" : "hidden"}>
    </div>
  );
}

export default AlertMessage;
