"use client";
import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import Header from "./_components/Header";
import Body from "./_components/Body/Body";
import ChatInput from "./_components/input/ChatInput";
import RemoveFriendDialog from "./_components/dialogs/RemoveFriendDialog";
import DeleteGroupDialog from "./_components/dialogs/DeleteGroupDialog";
import LeaveGroupDialog from "./_components/dialogs/LeaveGroupDialog";
import ChatDetailsDialog from "./_components/dialogs/ChatDetailsDialog";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  const [removeFriendDialougeOpen, setRemoveFriendDialougeOpen] =
    useState(false);
  const [leaveGroupDialogueOpen, setLeaveGroupDialogueOpen] = useState(false);
  const [deleteGroupDialogueOpen, setDeleteGroupDialogueOpen] = useState(false);
  const [chatDetailsDialogOpen, setChatDetailsDialogOpen] = useState(false);

  return conversation === undefined ? (
    <div className="w-full h-full flex items-centers justify-center">
      <Loader2 />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex items-centers justify-center">
      Start Chatting!
    </p>
  ) : (
    <ConversationContainer>
      <RemoveFriendDialog
        conversationId={conversationId}
        open={removeFriendDialougeOpen}
        setOpen={setRemoveFriendDialougeOpen}
      />
      <DeleteGroupDialog
        conversationId={conversationId}
        open={deleteGroupDialogueOpen}
        setOpen={setDeleteGroupDialogueOpen}
      />
      <LeaveGroupDialog
        conversationId={conversationId}
        open={leaveGroupDialogueOpen}
        setOpen={setLeaveGroupDialogueOpen}
      />
      <ChatDetailsDialog
        conversationId={conversationId}
        open={chatDetailsDialogOpen}
        setOpen={setChatDetailsDialogOpen}
      />
      <Header
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember?.imageUrl
        }
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember?.username) || ""
        }
        options={
          conversation.isGroup
            ? [
                {
                  label: "Leave Group",
                  destructive: false,
                  onClick: () => {
                    setLeaveGroupDialogueOpen(true);
                  },
                },
                {
                  label: "Delete Group",
                  destructive: true,
                  onClick: () => {
                    setDeleteGroupDialogueOpen(true);
                  },
                },
              ]
            : [
                {
                  label: "Remove Friend",
                  destructive: true,
                  onClick: () => {
                    setRemoveFriendDialougeOpen(true);
                  },
                },
              ]
        }
        openChatDetailsDialog={() => setChatDetailsDialogOpen(true)}
      />
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
