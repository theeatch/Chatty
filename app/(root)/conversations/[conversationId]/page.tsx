"use client";
import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";
import Header from "./_components/Header";
import Body from "./_components/Body/Body";
import ChatInput from "./_components/input/ChatInput";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId });

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
      <Header
        imageUrl={
          conversation.isGroup
            ? undefined
            : conversation.otherMember.imageUrl
        }
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember.username) || ""
        }
      />
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
