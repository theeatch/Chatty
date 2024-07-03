"use client";
import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import AddFriendDialog from "@/app/(root)/friends/_components/AddFriendDialog";
import ItemList from "@/components/shared/item-list/ItemList";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import Request from "./_components/Request";

type Props = {};

const FriendsPage = (props: Props) => {
  const requests = useQuery(api.requests.get);
  return (
    <>
      <ItemList action={<AddFriendDialog />} title="Friends">
        {requests ? (
          requests.length === 0 ? (
            <p className="h-full w-full items-center justify-center">
              No requests found
            </p>
          ) : (
            requests.map((request) => {
              return (
                <Request
                  key={request.request._id}
                  id={request.request._id}
                  imageUrl={request.sender.imageUrl}
                  username={request.sender.username}
                  email={request.sender.email}
                />
              );
            })
          )
        ) : (
          <Loader2 className="h-8 w-8" />
        )}
      </ItemList>
      <ConversationFallback />
    </>
  );
};

export default FriendsPage;
