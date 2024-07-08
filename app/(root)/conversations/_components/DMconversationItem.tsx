import { Id } from "@/convex/_generated/dataModel";
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  id: Id<"conversations">;
  imageUrl: string;
  username: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
  unseenCount?: number;
};

const DMconversationItem = ({
  id,
  imageUrl,
  username,
  lastMessageContent,
  lastMessageSender,
  unseenCount,
}: Props) => {
  return (
    <Link href={`/conversations/${id}`} className="w-full">
      <Card className="p-2 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate font-semibold">{username}</h4>
            {lastMessageSender && lastMessageContent ? (
              <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
                <p className="font-semibold">{lastMessageSender}{":"} &nbsp; </p>
                <p className="truncate overflow-ellipsis">{lastMessageContent}</p>
                </span>
            ) : (
              <p className="text-sm text-muted-foreground truncate">
                Start Chatting now!
              </p>
            )}
          </div>
        </div>
        {unseenCount ? <Badge>{unseenCount}</Badge> : null}
      </Card>
    </Link>
  );
};

export default DMconversationItem;
