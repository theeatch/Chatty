import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { Dispatch, SetStateAction } from "react";
type Props = {
  conversationId: Id<"conversations">;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ChatDetailsDialog = ({ conversationId, open, setOpen }: Props) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Avatar>
              <AvatarImage src={conversation?.otherMember?.imageUrl} />
              <AvatarFallback>
                {conversation?.otherMember?.username?.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-xl">{conversation?.otherMember?.username}</h1 >
            
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          no more info given.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChatDetailsDialog;
